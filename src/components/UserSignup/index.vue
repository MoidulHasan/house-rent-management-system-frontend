<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Create Renter"
			:modal="true"
			class="p-fluid"
			:closable="false"
			:draggable="false"
		>
			<div class="field">
				<label for="name">Name</label>
				<InputText
					id="name"
					v-model="userData.name"
					required="true"
					autofocus
					:class="{
						'p-invalid': submitted && !userData.name,
					}"
				/>
				<small class="p-error" v-if="submitted && !userData.name">
					Name is required.
				</small>
			</div>

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
				<label for="Phone">Phone Number</label>
				<InputText
					id="Phone"
					v-model="userData.phone"
					required="true"
				/>
				<small class="p-error" v-if="submitted && !userData.phone">
					Phone Number is required.
				</small>
			</div>

			<div class="field">
				<label for="permanentAddress">Permanent Address</label>
				<Textarea
					id="permanentAddress"
					v-model="userData.permanentAddress"
					required="true"
					rows="2"
				/>
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

			<div class="field">
				<label for="passwordConfirm">Confirm Password</label>
				<Password
					id="passwordConfirm"
					v-model="userData.passwordConfirm"
					:required="true"
					toggleMask
				/>
				<small
					class="p-error"
					v-if="submitted && !userData.passwordConfirm"
				>
					Confirm Password is required.
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
					label="Save"
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
		name: null,
		phone: null,
		email: null,
		permanentAddress: null,
		password: null,
		passwordConfirm: null,
	});

	const submitted = ref(false);

	// methods
	const hideDialog = () => {
		submitted.value = false;
		emits("hideDialog");
	};

	const handleSubmit = async () => {
		submitted.value = true;

		console.log(userData.value);

		if (
			userData.value.name &&
			userData.value.email &&
			userData.value.phone &&
			userData.value.password &&
			userData.value.passwordConfirm
		) {
			const response = await new AuthService().Signup(userData.value);
			console.log(response);

			if (response.status === "success") {
				hideDialog();

				userData.value = {
					name: null,
					phone: null,
					email: null,
					permanentAddress: null,
					password: null,
					passwordConfirm: null,
				};

				toast.add({
					severity: "success",
					summary: "Success",
					detail: "Signup Successful",
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
