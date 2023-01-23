<template>
	<div
		class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
	>
		<ClientOnly>
			<Toast />
		</ClientOnly>
		<div
			class="grid justify-content-center p-2 lg:p-0"
			style="min-width: 80%"
		>
			<div class="col-12 xl:col-6 container1" style="">
				<div
					class="h-full w-full m-0 py-7 px-4 container2"
					style=""
				>
					<div class="text-center mb-5">
						<div class="text-900 text-3xl font-medium mb-3">
							Welcome to HRMS!
						</div>
						<span class="text-600 font-medium"
							>Sign up to continue</span
						>
					</div>

					<div class="w-full md:w-10 mx-auto">
						<div class="grid">
							<div class="col-12">
								<label
									for="name"
									class="block text-900 text-xl font-medium mb-2"
								>
									Full Name
								</label>

								<InputText
									id="name"
									v-model="userData.name"
									required="true"
									autofocus
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.name,
										},
										'w-full mb-3',
									]"
									placeholder="Full Name"
									style="padding: 1rem"
								/>

								<small
									class="p-error"
									v-if="submitted && !userData.name"
								>
									Name is required.
								</small>
							</div>

							<div class="col-12 md:col-6">
								<label
									for="email"
									class="block text-900 text-xl font-medium mb-2"
								>
									Email Address
								</label>
								<InputText
									v-model="userData.email"
									aria-describedby="email"
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.email,
										},
										'w-full mb-3',
									]"
									placeholder="Email Address"
									style="padding: 1rem"
								/>
								<small
									class="p-error"
									v-if="submitted && !userData.email"
								>
									Email Address is required.
								</small>
							</div>

							<div class="col-12 md:col-6">
								<label
									for="Phone"
									class="block text-900 text-xl font-medium mb-2"
								>
									Phone Number
								</label>
								<InputText
									id="Phone"
									v-model="userData.phone"
									required="true"
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.phone,
										},
										'w-full mb-3',
									]"
									placeholder="Phone Number"
									style="padding: 1rem"
								/>
								<small
									class="p-error"
									v-if="submitted && !userData.phone"
								>
									Phone Number is required.
								</small>
							</div>

							<div class="col-12">
								<label
									for="permanentAddress"
									class="block text-900 text-xl font-medium mb-2"
								>
									Permanent Address
								</label>
								<Textarea
									id="permanentAddress"
									v-model="userData.permanentAddress"
									required="true"
									rows="2"
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.permanentAddress,
										},
										'w-full mb-3',
									]"
									placeholder="Permanent Address"
									style="padding: 1rem"
								/>
							</div>

							<div class="col-12 md:col-6">
								<label
									for="Password"
									class="block text-900 text-xl font-medium mb-2"
								>
									Password
								</label>

								<Password
									id="Password"
									v-model="userData.password"
									:required="true"
									toggleMask
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.password,
										},
										'w-full mb-3',
									]"
									input-class="w-full"
									placeholder="Password"
									input-style="padding:1rem"
								/>

								<small
									class="p-error"
									v-if="
										submitted &&
										!userData.password
									"
								>
									Password is required.
								</small>
							</div>

							<div class="col-12 md:col-6">
								<label
									for="Password"
									class="block text-900 text-xl font-medium mb-2"
								>
									Confirm Password
								</label>

								<Password
									id="Password"
									v-model="userData.passwordConfirm"
									:required="true"
									toggleMask
									:class="[
										{
											'p-invalid':
												submitted &&
												!userData.passwordConfirm,
										},
										'w-full mb-3',
									]"
									input-class="w-full"
									placeholder="Password"
									input-style="padding:1rem"
								/>

								<small
									class="p-error"
									v-if="
										submitted &&
										!userData.passwordConfirm
									"
								>
									Confirm Password is required.
								</small>
								<small
									class="p-error"
									v-if="
										userData.passwordConfirm !==
										userData.password
									"
								>
									Confirm Password not matched.
								</small>
							</div>

							<div class="col-12">
								<div
									class="flex align-items-center justify-content-between mb-5"
								>
									<div class="text-center mb-5">
										<span
											class="text-600 font-medium"
										>
											Already have an account?
										</span>
										<span
											class="text-600 font-medium"
										>
											<a :href="'/login'">
												Login Now!
											</a>
										</span>
									</div>
								</div>
								<Button
									label="Sign In"
									type="submit"
									class="w-full p-3 text-xl"
									@click="handleSubmit"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useToast } from "primevue/usetoast";
	import AuthService from "~~/src/services/Auth.Service";

	definePageMeta({
		layout: "empty",
		title: "Register",
	});

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

	const handleSubmit = async () => {
		submitted.value = true;

		if (
			userData.value.name &&
			userData.value.email &&
			userData.value.phone &&
			userData.value.password &&
			userData.value.passwordConfirm &&
			userData.value.password === userData.value.passwordConfirm
		) {
			const response = await new AuthService().Signup(userData.value);
			console.log(response);

			if (response.status === "success") {
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

		submitted.value = false;
	};
</script>

<style scoped>
	.pi-eye {
		transform: scale(1.6);
		margin-right: 1rem;
	}

	.pi-eye-slash {
		transform: scale(1.6);
		margin-right: 1rem;
	}

	.container1 {
		border-radius: 56px;
		padding: 0.3rem;
		background: linear-gradient(
			180deg,
			var(--primary-color),
			rgba(33, 150, 243, 0) 30%
		);
	}

	.container2 {
		border-radius: 53px;
		background: linear-gradient(
			180deg,
			var(--surface-50) 38.9%,
			var(--surface-0)
		);
	}
</style>
