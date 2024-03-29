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
							Welcome back!
						</div>
						<span class="text-600 font-medium"
							>Sign in to continue</span
						>
					</div>

					<div class="w-full md:w-10 mx-auto">
						<div class="grid">
							<div class="col-12">
								<label
									for="email"
									class="block text-900 text-xl font-medium mb-2"
								>
									Email Address
								</label>
								<InputText
									v-model="email"
									aria-describedby="email"
									:class="'w-full mb-3'"
									placeholder="Email Address"
									style="padding: 1rem"
								/>
								<small
									class="p-error"
									v-if="submitted && !email"
								>
									Email Address is required.
								</small>
							</div>

							<div class="col-12">
								<label
									for="password"
									class="block text-900 text-xl font-medium mb-2"
									>Password</label
								>

								<Password
									v-model="password"
									aria-describedby="password"
									:toggle-mask="true"
									class="w-full mb-3"
									input-class="w-full"
									placeholder="Password"
									input-style="padding:1rem"
									@keyup.enter="handleSubmit"
								/>

								<small
									class="p-error"
									v-if="submitted && !password"
								>
									Password is required.
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
											Don't have any account?
										</span>
										<span
											class="text-600 font-medium"
										>
											<a :href="'/register'">
												Register Now!
											</a>
										</span>
									</div>
								</div>
								<Button
									label="Sign In"
									type="submit"
									class="w-full p-3 text-xl"
									@click="login"
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
	import Toast from "primevue/toast";
	import AuthService from "~/services/Auth.Service";
	import { useAuthStore } from "~~/src/stores/auth.store";

	definePageMeta({
		layout: "empty",
		title: "Login",
	});

	// Declare hooks
	const authStore = useAuthStore();
	const toast = useToast();
	const router = useRouter();

	// Declare states
	const email = ref(null);
	const password = ref("");
	const checked = ref(false);
	const field = ref("");
	const submitted = ref(false);

	const initialValues = {
		email: "antu.khan.988@gmail.com",
		password: "test1234",
	};

	// methods
	onMounted(() => {
		email.value = initialValues.email;
		password.value = initialValues.password;
	});

	const login = async () => {
		submitted.value = true;

		if (!email.value || !password.value) return;

		try {
			const values = {
				email: email.value,
				password: password.value,
			};
			const response = await new AuthService().Login(values);

			if (response.status === "success") {
				toast.add({
					severity: "success",
					summary: "Success",
					detail: response.message,
					life: 3000,
				});

				if (
					response?.data?.user?.role === "Renter" ||
					response?.data?.user?.role === "Guest"
				)
					router.push("/");
				else if (response?.data?.user?.role === "Admin")
					router.push("/admin/");
			} else {
				toast.add({
					severity: "error",
					summary: "Failed",
					detail: response.message,
					life: 3000,
				});
			}

			submitted.value = false;
		} catch (err) {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: err,
				life: 3000,
			});

			submitted.value = false;
		}
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
