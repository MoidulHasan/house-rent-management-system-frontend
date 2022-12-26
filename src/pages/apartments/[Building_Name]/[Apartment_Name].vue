<template>
	<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

	<div class="card">
		<h4 class="flex">
			<span>Apartment Name : </span>
			<span class="ml-2"> {{ route.params.Apartment_Name }}</span>
		</h4>

		<div class="mt-2">
			<CommonMetaData
				:data-key="'Building Name '"
				:value="route.params.Building_Name"
			/>
		</div>

		<div class="mt-2">
			<CommonMetaData
				:data-key="'Descriptions '"
				:value="ApartmentData.Descriptions"
			/>
		</div>

		<div class="mt-2 flex align-items-center">
			<CommonMetaData :data-key="'Status '">
				<Badge
					:value="ApartmentData?.Status"
					class="text-white ml-2"
					:severity="
						ApartmentData?.Status === 'Unoccupied'
							? 'warning'
							: 'success'
					"
				/>
			</CommonMetaData>

			<CommonMetaData :data-key="'Rent Charge '" class="ml-3">
				<Badge
					:value="ApartmentData?.Rent_Charge"
					class="text-white ml-2"
					severity="info"
				/>
			</CommonMetaData>

			<CommonMetaData :data-key="'Number of room '" class="ml-3">
				<Badge
					:value="ApartmentData?.Number_of_room"
					class="text-white ml-2"
					severity="info"
				/>
			</CommonMetaData>
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
