<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<div class="card">
			<div>
				<h3 class="flex">
					<span>Name : </span>
					<span> {{ userData?.name }}</span>
				</h3>
			</div>

			<!-- <div class="flex">
				<CommonMetaData
					:data-key="'Building Name'"
					:value="userData?.Apartment.Building.Building_Name"
				/>

				<CommonMetaData
					class="ml-3"
					:data-key="'Apartment Name'"
					:value="userData?.Apartment.Unit_Name"
				/>
			</div> -->

			<div class="flex mt-2">
				<CommonMetaData
					:data-key="'Email Address'"
					:value="userData?.email"
				/>

				<!-- <CommonMetaData
					class="ml-3"
					:data-key="'NID Number '"
					:value="userData?.NID"
				/> -->
			</div>

			<div class="mt-3">
				<!-- <CommonMetaData
					:data-key="'Permanent Address '"
					:value="userData?.Permanent_Address"
				/> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import User from "~/services/User.Service";
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
	const userData = ref(null);

	const breadCrumbItems = ref({
		label: "Home",
		url: "/",
		item: {
			label: "Users",
			url: "/users",
			item: {
				label: userData?.name,
			},
		},
	});

	// methods
	const fetchUserData = async () => {
		const response = await User.fetchAll();

		if (response.status === "success") {
			userData.value = response.data.data.filter(
				(data) => data._id === route.params.user_id
			)[0];

			breadCrumbItems.value.item.item.label =
				userData.value?.User?.name;
		}
	};

	onMounted(async () => {
		store.loading = true;
		await fetchUserData();
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
