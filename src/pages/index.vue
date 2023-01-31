<template>
	<div class="m-5">
		<div
			class="my-5 flex flex-column align-items-center justify-content-center"
		>
			<h1 class="home-title">Find Best Apartment For You</h1>
			<p class="home-text" style="margin-top: 22px">
				Availabale apartments
			</p>
		</div>

		<div v-if="apartments" class="grid">
			<div
				v-for="apartmentData in apartments"
				:key="apartmentData.id"
				class="col-12 md:col-4 p-2"
			>
				<ApartmentCard :apartment="apartmentData" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import RentService from "../services/Rent.Service";
	import { useAuthStore } from "../stores/auth.store";
	import { useStore } from "../stores/store";

	definePageMeta({
		title: "Dashboard",
		layout: "userpanel",
	});

	const store = useStore();
	const authStore = useAuthStore();
	const route = useRoute();

	const apartments = ref(null);

	const fetchApartment = async () => {
		const response = await RentService.fetchAll();

		if (response.status === "success") {
			apartments.value = response.data.data.filter(
				(apartment) => apartment.Status !== "Occupied"
			);
		} else {
			apartments.value = [];
		}
	};

	onMounted(async () => {
		const isAdminRoute = route.path.includes("admin");

		if (!isAdminRoute && authStore?.user?.role === "Admin")
			return navigateTo("/admin");

		store.loading = true;
		await fetchApartment();
		store.loading = false;
	});
</script>

<style scoped>
	.empty-card {
		/* min-height: 50vh; */
		padding: 32px;
		background: #fafafe;
		border-radius: 12px;
	}

	.home-title {
		font-family: "Cormorant Garamond";
		text-transform: uppercase;
		font-size: 44px;
		font-weight: 400;
		line-height: 1em;
		letter-spacing: 0.15em;
		word-wrap: break-word;
		box-sizing: border-box;
		margin: 0;
		color: blue;
	}

	.home-text {
		text-align: center;
		vertical-align: baseline;
		padding: 0;
		background: 0 0;
		border: 0;
		outline: 0;
		box-sizing: border-box;
		font-size: 13px;
		letter-spacing: 0.6em;
		font-family: Raleway;
		margin: 13px 0 0;
		text-transform: uppercase;
		font-weight: 500;
		line-height: 2.2em;
		color: #c28562;
		margin-top: 22px;
	}
</style>
