<template>
	<div>
		<div class="layout-topbar">
			<Button
				class="p-link layout-menu-button layout-topbar-button sidebar-button"
				@click="onMenuToggle"
			>
				<svg
					:class="
						menuClick === false ? 'menu-open' : 'menu-close'
					"
					width="20"
					height="16"
					viewBox="0 0 26 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.75 8.8125H24.75C24.8875 8.8125 25 8.7 25 8.5625V6.8125C25 6.675 24.8875 6.5625 24.75 6.5625H9.75C9.6125 6.5625 9.5 6.675 9.5 6.8125V8.5625C9.5 8.7 9.6125 8.8125 9.75 8.8125ZM9.5 15.1875C9.5 15.325 9.6125 15.4375 9.75 15.4375H24.75C24.8875 15.4375 25 15.325 25 15.1875V13.4375C25 13.3 24.8875 13.1875 24.75 13.1875H9.75C9.6125 13.1875 9.5 13.3 9.5 13.4375V15.1875ZM25.25 0H0.75C0.6125 0 0.5 0.1125 0.5 0.25V2C0.5 2.1375 0.6125 2.25 0.75 2.25H25.25C25.3875 2.25 25.5 2.1375 25.5 2V0.25C25.5 0.1125 25.3875 0 25.25 0ZM25.25 19.75H0.75C0.6125 19.75 0.5 19.8625 0.5 20V21.75C0.5 21.8875 0.6125 22 0.75 22H25.25C25.3875 22 25.5 21.8875 25.5 21.75V20C25.5 19.8625 25.3875 19.75 25.25 19.75ZM0.60625 11.2156L5.49063 15.0625C5.67188 15.2062 5.94063 15.0781 5.94063 14.8469V7.15312C5.94063 6.92187 5.675 6.79375 5.49063 6.9375L0.60625 10.7844C0.573407 10.8099 0.546831 10.8426 0.528549 10.88C0.510268 10.9173 0.500765 10.9584 0.500765 11C0.500765 11.0416 0.510268 11.0827 0.528549 11.12C0.546831 11.1574 0.573407 11.1901 0.60625 11.2156V11.2156Z"
						fill="#5E5E5E"
					/>
				</svg>
			</Button>

			<NuxtLink
				v-show="menuClick"
				to="/admin/"
				class="layout-topbar-logo"
			>
				<img
					alt="House Rent Management System"
					:src="'/images/logos/House-Rent-Management-System.png'"
				/>
			</NuxtLink>

			<button
				:styleClass="{
					selector: '@next',
					enterClass: 'hidden',
					enterActiveClass: 'scalein',
					leaveToClass: 'hidden',
					leaveActiveClass: 'fadeout',
					hideOnOutsideClick: true,
				}"
				class="p-link layout-topbar-menu-button layout-topbar-button"
			>
				<i class="pi pi-ellipsis-v" />
			</button>

			<ul class="layout-topbar-menu hidden lg:flex origin-top">
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
