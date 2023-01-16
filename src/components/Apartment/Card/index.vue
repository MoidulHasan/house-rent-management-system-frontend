<template>
	<Card>
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
			<span class="text-purpale">{{ apartment.Rent_Charge }}</span>
			/month
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
			<div class="flex justify-content-end">
				<Button
					v-if="isApplied"
					icon="pi pi-times"
					label="Cancle"
					class="mr-2 p-button-danger"
					@click="handleDelete"
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
					label="Apply"
					@click="handleApply"
				/>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
	import { useAuthStore } from "~~/src/stores/auth.store";
	import { useToast } from "primevue/usetoast";

	import Application from "~/services/Application.Service";

	const authStore = useAuthStore();
	const toast = useToast();

	const applicationId = ref(null);

	const props = defineProps<{
		apartment: object;
	}>();

	// states
	const isApplied = computed(() => {
		if (authStore.user) {
			const hasApplication = authStore.user.applications?.filter(
				(application) =>
					application.apartment_id === props.apartment._id
			);

			if (hasApplication?.length) {
				applicationId.value = hasApplication[0]._id;
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
			location.replace("/login");
		}

		const applicationData = {
			apartment_id: props.apartment._id,
			user_id: authStore.user._id,
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
