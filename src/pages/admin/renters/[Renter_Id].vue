<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<div class="card">
			<div>
				<h3 class="flex">
					<span>Name : </span>
					<span> {{ renterData?.User.name }}</span>
				</h3>
			</div>

			<div class="flex">
				<CommonMetaData
					:data-key="'Building Name'"
					:value="renterData?.Apartment.Building.Building_Name"
				/>

				<CommonMetaData
					class="ml-3"
					:data-key="'Apartment Name'"
					:value="renterData?.Apartment.Unit_Name"
				/>
			</div>

			<div class="flex mt-2">
				<CommonMetaData
					:data-key="'Email Address'"
					:value="renterData?.User.email"
				/>

				<!-- <CommonMetaData
					class="ml-3"
					:data-key="'NID Number '"
					:value="renterData?.NID"
				/> -->
			</div>

			<div class="mt-3">
				<!-- <CommonMetaData
					:data-key="'Permanent Address '"
					:value="renterData?.Permanent_Address"
				/> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Renter from "~/services/Renter.Service";
	import Building from "~/services/Building.Service";
	import Appartment from "~/services/Appartment.Service";
	import { useStore } from "~~/src/stores/store";
	import { useToast } from "primevue/usetoast";
	import { FilterMatchMode } from "primevue/api";

	// define page meta
	definePageMeta({
		title: "Building Details",
		middleware: ["auth"],
	});

	// hooks
	const route = useRoute();
	const toast = useToast();
	const store = useStore();

	// states
	const renterData = ref(null);

	const breadCrumbItems = ref({
		label: "Home",
		url: "/",
		item: {
			label: "Renter",
			url: "/renters",
			item: {
				label: renterData.value?.Name,
			},
		},
	});

	// methods
	const fetchRenterData = async () => {
		const response = await Renter.fetchAll();
		console.log(response);

		if (response.status === "success") {
			renterData.value = response.data.data.filter(
				(data) => data.User._id === route.params.Renter_Id
			)[0];

			breadCrumbItems.value.item.item.label =
				renterData.value?.User?.name;
		}
	};

	onMounted(async () => {
		store.loading = true;
		await fetchRenterData();
		store.loading = false;
	});

	// formate date
	const formatedStartDate = (Rent_Start_Date) => {
		const rentDate = new Date(Rent_Start_Date);
		return (
			rentDate.getDate() +
			"/" +
			rentDate.getMonth() +
			"/" +
			rentDate.getFullYear()
		);
	};
</script>

<style scoped></style>
