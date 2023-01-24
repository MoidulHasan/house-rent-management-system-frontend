<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Login"
			:modal="true"
			class="p-fluid"
			:closable="false"
			:draggable="false"
		>
			<div class="field">
				<label for="Email">Email Address</label>
				<InputText
					id="Email"
					v-model="userData.email"
					required="true"
				/>
				<small class="p-error" v-if="submitted && !userData.email">
					Email Address is required.
				</small>
			</div>

			<div class="field">
				<label for="Password">Password</label>
				<Password
					id="Password"
					v-model="userData.password"
					:required="true"
					toggleMask
				/>
				<small
					class="p-error"
					v-if="submitted && !userData.password"
				>
					Password is required.
				</small>
			</div>

			<template #footer>
				<Button
					label="Cancel"
					icon="pi pi-times"
					class="p-button-text"
					@click="hideDialog"
				/>
				<Button
					label="Login"
					icon="pi pi-check"
					class="p-button-text"
					@click="handleSubmit"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import Building from "~/services/Building.Service";
	import { useToast } from "primevue/usetoast";
	import AuthService from "~~/src/services/Auth.Service";

	// define props
	const props = defineProps<{
		showDialog: boolean;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
	}>();

	// hooks
	const toast = useToast();

	// define states
	const userData = ref({
		email: null,
		password: null,
	});

	const submitted = ref(false);

	// methods
	const hideDialog = () => {
		submitted.value = false;
		emits("hideDialog");
	};

	const handleSubmit = async () => {
		submitted.value = true;

		if (userData.value.email && userData.value.password) {
			const response = await new AuthService().Login(userData.value);

			if (response.status === "success") {
				hideDialog();

				userData.value = {
					email: null,
					password: null,
				};

				toast.add({
					severity: "success",
					summary: "Success",
					detail: "Signup Successful",
					life: 3000,
				});

				if (
					response.data.user.role === "Renter" ||
					response.data.user.role === "Guest"
				) {
					location.reload();
				} else {
					location.replace("/admin");
				}
			} else {
				toast.add({
					severity: "error",
					summary: "Failed",
					detail: response.message,
					life: 3000,
				});
			}
		} else {
			toast.add({
				severity: "warn",
				summary: "Failed",
				detail: "Fillup All Required Field",
				life: 3000,
			});
		}
	};
</script>

<style scoped></style>
