<template>
	<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

	<div class="card">
		<h4 class="flex">
			<span>Building Name : </span>
			<span class="ml-2"> {{ route.params.Building_Name }}</span>
		</h4>
		<h4 class="flex">
			<span>Apartment Name : </span>
			<span class="ml-2"> {{ route.params.Apartment_Name }}</span>
		</h4>
		<p>
			<span>Descriptions : </span>
			<span>{{ ApartmentData?.Descriptions }}</span>
		</p>

		<div class="flex align-items-center">
			<div class="mr-3 flex align-items-center">
				<div>Status :</div>
				<Badge
					:value="ApartmentData?.Status"
					class="text-white ml-2"
					:severity="
						ApartmentData?.Status === 'Unoccupied'
							? 'warning'
							: 'success'
					"
				/>
			</div>
			<div class="mr-3 flex align-items-center">
				<div>Rent Charge :</div>
				<Badge
					:value="ApartmentData?.Rent_Charge"
					class="text-white ml-2"
					severity="info"
				/>
			</div>

			<div class="mr-3 flex align-items-center">
				<div>Number of room :</div>
				<Badge
					:value="ApartmentData?.Number_of_room"
					class="text-white ml-2"
					severity="info"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import { useStore } from "~~/src/stores/store";

	// define hooks
	const route = useRoute();
	const store = useStore();

	// define page meta
	definePageMeta({
		title: "Apartment Details",
		middleware: ["auth"],
	});

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Apartments",
			url: "/apartments",
			item: {
				label:
					route.params.Building_Name +
					"-" +
					route.params.Apartment_Name,
			},
		},
	};

	const ApartmentData = ref();

	// methods
	onMounted(async () => {
		store.loading = true;
		await fetchData();
		store.loading = false;
	});

	const fetchData = async () => {
		const response = await Appartment.fetchAll();

		if (response.status === "success") {
			ApartmentData.value = response.data.data.filter(
				(data) =>
					data.Building_Name === route.params.Building_Name &&
					data.Unit_Name === route.params.Apartment_Name
			)[0];
		}
	};
</script>

<style scoped></style>
