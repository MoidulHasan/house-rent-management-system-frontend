<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<div class="grid">
			<div class="col-3">
				<div class="card mb-0">
					<div class="flex justify-content-between mb-3">
						<div>
							<span
								class="block text-500 font-medium mb-3"
							>
								Total Building
							</span>
							<div class="text-900 font-medium text-xl">
								{{ totalBuilding }}
							</div>
						</div>
						<div
							class="flex align-items-center justify-content-center bg-blue-100 border-round"
							style="width: 2.5rem; height: 2.5rem"
						>
							<i
								class="pi pi-home text-blue-500 text-xl"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="card mb-0">
					<div class="flex justify-content-between mb-3">
						<div>
							<span
								class="block text-500 font-medium mb-3"
							>
								Total Apartment
							</span>
							<div class="text-900 font-medium text-xl">
								{{ totalApartment }}
							</div>
						</div>
						<div
							class="flex align-items-center justify-content-center bg-blue-100 border-round"
							style="width: 2.5rem; height: 2.5rem"
						>
							<i
								class="pi pi-building text-blue-500 text-xl"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="col-3">
				<div class="card mb-0">
					<div class="flex justify-content-between mb-3">
						<div>
							<span
								class="block text-500 font-medium mb-3"
							>
								Total Application
							</span>
							<div class="text-900 font-medium text-xl">
								{{ totalApplication }}
							</div>
						</div>
						<div
							class="flex align-items-center justify-content-center bg-blue-100 border-round"
							style="width: 2.5rem; height: 2.5rem"
						>
							<i
								class="pi pi-file text-blue-500 text-xl"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="col-3">
				<div class="card mb-0">
					<div class="flex justify-content-between mb-3">
						<div>
							<span
								class="block text-500 font-medium mb-3"
							>
								Total User
							</span>
							<div class="text-900 font-medium text-xl">
								{{ totalUser }}
							</div>
						</div>
						<div
							class="flex align-items-center justify-content-center bg-blue-100 border-round"
							style="width: 2.5rem; height: 2.5rem"
						>
							<i
								class="pi pi-users text-blue-500 text-xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Appartment from "~/services/Appartment.Service";
	import Renter from "~/services/Renter.Service";
	import ApplicationService from "~~/src/services/Application.Service";
	import BuildingService from "~~/src/services/Building.Service";
	import UserService from "~~/src/services/User.Service";

	import { useStore } from "~~/src/stores/store";

	// define page meta
	definePageMeta({
		title: "Dashboard",
		middleware: ["auth"],
	});

	// hooks
	const store = useStore();

	// states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Dashboard",
			url: "/Dashboard",
		},
	};

	const totalApplication = ref(null);
	const totalBuilding = ref(null);
	const totalApartment = ref(null);
	const totalUser = ref(null);

	onMounted(async () => {
		const apartments = await Appartment.fetchAll();
		totalApartment.value = apartments.results;

		const buildings = await BuildingService.fetchAll();
		totalBuilding.value = buildings.results;

		const applications = await ApplicationService.fetchAll();
		totalApplication.value = applications.results;

		const users = await UserService.fetchAll();
		totalUser.value = users.results;
	});
</script>

<style lang="scss" scoped></style>
