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
						class="layout-topbar-menu hidden lg:flex origin-top"
					>
						<li>
							<button class="p-link layout-topbar-button">
								<i class="pi pi-calendar" />
								<span>Events</span>
							</button>
						</li>
						<li>
							<button class="p-link layout-topbar-button">
								<i class="pi pi-cog" />
								<span>Settings</span>
							</button>
						</li>
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
	const menuClick = ref(false);
	const menu = ref();
	const menuItems = ref([
		{
			label: "Dashboard",
			to: "/",
		},
		{
			label: "Billing",
			to: "/billing",
		},
	]);

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
					router.push("/login");
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
