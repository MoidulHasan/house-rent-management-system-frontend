<template>
	<div>
		<div>
			<Menubar :model="menuItems" class="layout-topbar">
				<template #start>
					<NuxtLink to="/">
						<img
							alt="House Rent Management System"
							:src="'/images/logos/House-Rent-Management-System.png'"
						/>
					</NuxtLink>
				</template>
				<template #end>
					<ul
						v-if="authStore.authenticated"
						class="layout-topbar-menu hidden lg:flex origin-top"
					>
						<li>
							<button
								class="p-link layout-topbar-button"
								@click="toggle"
								aria-haspopup="true"
								aria-controls="overlay_menu"
							>
								<i class="pi pi-user" />
								<span>Profile</span>
							</button>
							<Menu
								id="overlay_menu"
								ref="menu"
								:model="items"
								:popup="true"
							/>
						</li>
					</ul>
					<ul v-else>
						<Button
							label="Login"
							class="p-button p-button-outlined mr-3"
							@click="toggleLoginDialog"
						/>
						<Button
							label="Sign up"
							class="p-button-raised"
							@click="toggleSignUpDialog"
						/>
					</ul>
				</template>
			</Menubar>
		</div>
		<div>
			<ProgressBar
				v-if="mainStore.loading"
				mode="indeterminate"
				style="height: 0.25em"
			/>
		</div>

		<UserSignup
			:show-dialog="showSignUp"
			@hide-dialog="toggleSignUpDialog"
		/>

		<UserLogin
			:show-dialog="showLogin"
			@hide-dialog="toggleLoginDialog"
		/>
	</div>
</template>

<script lang="ts" setup>
	import { useToast } from "primevue/usetoast";
	import Toast from "primevue/toast";
	import { useStore } from "~~/src/stores/store";
	import { useAuthStore } from "~~/src/stores/auth.store";
	import AuthService from "~~/src/services/Auth.Service";
	// Define emits
	const emits = defineEmits(["topbar-menu-toggle", "menu-toggle"]);

	// Hooks
	const toast = useToast();
	const mainStore = useStore();
	const authStore = useAuthStore();
	const router = useRouter();

	// Define States
	const showSignUp = ref(false);
	const showLogin = ref(false);
	const menuClick = ref(false);
	const menu = ref();
	const menuItems = computed(() => {
		if (authStore.authenticated) {
			return [
				{
					label: "Rent",
					to: "/rent",
				},
				{
					label: "Billing",
					to: "/billing",
				},
			];
		} else {
			return [
				{
					label: "Rent",
					to: "/rent",
				},
			];
		}
	});

	const items = ref([
		{
			label: "Logout",
			icon: "pi pi-sign-out",
			command: async () => {
				const logout = await new AuthService().Logout();

				if (logout.status) {
					toast.add({
						severity: "success",
						summary: "Success",
						detail: logout.message,
						life: 3000,
					});
					authStore.setToken("");
					authStore.setUser({});
					router.push("/");
				} else {
					toast.add({
						severity: "error",
						summary: "Failed",
						detail: logout.message,
						life: 3000,
					});
				}
			},
		},
	]);
	// Define methods
	const onMenuToggle = (event: any) => {
		menuClick.value = !menuClick.value;
		emits("menu-toggle", event);
	};

	const onTopbarMenuToggle = (event: any) => {
		emits("topbar-menu-toggle", event);
	};

	const toggle = (event) => {
		menu.value.toggle(event);
	};

	const toggleSignUpDialog = () => {
		showSignUp.value = !showSignUp.value;
	};

	const toggleLoginDialog = () => {
		showLogin.value = !showLogin.value;
	};
</script>

<style scoped>
	.menu-close {
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		transform: rotate(180deg);
		transition-duration: 0.5s;
	}

	.menu-open {
		transition-duration: 0.5s;
	}

	.menu-open:hover {
		fill: white;
	}

	.sidebar-button {
		color: #000;
	}

	.sidebar-button:hover {
		color: #fff;
	}

	.sidebar-button svg path {
		fill: currentcolor;
	}
</style>
