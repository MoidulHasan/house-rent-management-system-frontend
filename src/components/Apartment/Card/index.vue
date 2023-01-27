<template>
	<Card style="min-height: 280px">
		<template #header>
			<img
				src="https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg"
				height="300"
			/>
		</template>
		<template #title>
			{{ apartment.Building_Name + " - " + apartment.Unit_Name }}
		</template>
		<template #subtitle>
			<div>
				<span class="text-purpale">{{
					apartment.Rent_Charge
				}}</span>
				/month
			</div>

			<div class="">
				Available From:
				<span class="text-purpale-sm">
					{{ formatedDate(apartment.Abailable_From) }}
				</span>
			</div>
		</template>

		<template #content>
			<div>
				<p>
					{{ apartment.Descriptions }}
				</p>
			</div>
			<Divider class="mt-2" />

			<div class="flex gap-2">
				<div class="">
					Category :
					<span class="text-purpale-sm"
						>{{ apartment.Category }}
					</span>
				</div>
				<div class="">
					Status :
					<span class="text-purpale-sm"
						>{{ apartment.Status }}
					</span>
				</div>
				<div class="">
					Number of Room :
					<span class="text-purpale-sm"
						>{{ apartment.Number_of_room }}
					</span>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex justify-content-between">
				<div v-if="isApplied">
					<Button
						v-if="applicationStatus === 'Rejected'"
						class="p-button-danger"
						:label="applicationStatus"
						disabled="true"
						@click.stop
					/>
					<Button
						v-else
						class="primary"
						:label="applicationStatus"
						disabled="true"
						@click.stop
					/>
				</div>

				<div>
					<Button
						v-if="isApplied"
						icon="pi pi-times"
						label="cancel"
						class="mr-2 p-button-danger"
						@click="handleDelete"
						:disabled="applicationStatus === 'Rejected'"
					/>
					<Button
						v-if="isApplied"
						icon="pi pi-check"
						label="Applied"
						disabled
					/>

					<Button
						v-if="!isApplied"
						icon="pi pi-file-import"
						label="Apply Booking"
						@click="handleApply"
					/>
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import { useAuthStore } from "~~/src/stores/auth.store";
	import { useToast } from "primevue/usetoast";

	import Application from "~/services/Application.Service";
	import { Apartment } from "~~/constants/Types";
	import { formatedDate } from "~~/src/utils";

	const authStore = useAuthStore();
	const toast = useToast();

	const applicationId = ref(null);
	const applicationStatus = ref();

	const props = defineProps<{
		apartment: Apartment;
	}>();

	// states
	const isApplied = computed(() => {
		if (authStore.user) {
			const hasApplication = props.apartment.applications.filter(
				(application) => application.user == authStore.user._id
			);

			if (hasApplication?.length) {
				applicationId.value = hasApplication[0]._id;
				applicationStatus.value =
					hasApplication[0].application_status;
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	});

	const handleApply = async () => {
		if (!authStore.authenticated) {
			toast.add({
				severity: "warn",
				summary: "Login First",
				detail: "You are not logedin, please login first.",
				life: 3000,
			});

			setTimeout(() => {
				location.replace("/login");
			}, 3000);

			return;
		}

		const applicationData = {
			apartment: props.apartment._id,
			user: authStore.user._id,
		};

		const response = await Application.Create(applicationData);

		if (response.status === "success") {
			const user = authStore.user;
			user?.applications?.push(response.data.doc);

			authStore.setUser(user);

			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Successfully Applied",
				life: 3000,
			});

			window.location.reload(true);
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: response.message,
				life: 3000,
			});
		}
	};

	const handleDelete = async () => {
		const response = await Application.Cancel(
			applicationId.value,
			authStore.user._id
		);

		if (response.status === "success") {
			const user = authStore.user;
			user.applications = user?.applications?.map((application) => {
				return application._id !== applicationId.value;
			});

			authStore.setUser(user);

			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Successfully Canceled",
				life: 3000,
			});
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: response.message,
				life: 3000,
			});
		}
	};
</script>

<style scoped>
	.text-purpale {
		color: #6f64ec;
		font-size: 23px;
	}

	.text-purpale-sm {
		color: #6f64ec;
		font-size: 15px;
	}
</style>
