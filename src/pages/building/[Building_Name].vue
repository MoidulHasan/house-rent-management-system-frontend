<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<div class="card">
			<h3 class="flex">
				<span>Building Name : </span>
				<span> {{ Building_Data?.Building_Name }}</span>
			</h3>
			<p>
				<span>Address : </span>
				<span>{{ Building_Data?.Address }}</span>
			</p>
			<p>
				<span>Discription : </span>
				<span>{{ Building_Data?.Descriptions }}</span>
			</p>

			<div class="flex">
				<p>
					<span>Caretaker Name : </span>
					<span>{{ Building_Data?.Caretaker_Name }}</span>
				</p>
				<p class="ml-3">
					<span>Caretaker Phone : </span>
					<span>{{ Building_Data?.Caretaker_Phone }}</span>
				</p>
			</div>
		</div>

		<div>
			<Toolbar class="mb-4">
				<template #start>
					<Button
						label="New"
						icon="pi pi-plus"
						class="p-button-success mr-2"
						@click="showDialogAdd"
					/>
				</template>

				<template #end>
					<Button
						label="Export"
						icon="pi pi-upload"
						class="p-button-help"
						@click="exportCSV($event)"
					/>
				</template>
			</Toolbar>

			<ApartmentTable
				:apartment-data="AppartmentData"
				:export-table="exportTable"
				@edit-data="editData"
				@delete-data="deleteData"
			/>

			<ApartmentAdd
				:show-dialog="showAddDialog"
				:building-name="route.params.Building_Name"
				@hide-dialog="hideDialogAdd"
			/>

			<ApartmentEdit
				:show-dialog="showEditDialog"
				:data="editableData"
				@hide-dialog="hideEditDialog"
			/>

			<ApartmentDelete
				:apartment-id="deleteRowId"
				:show-dialog="showDeleteDialog"
				@on-deleted="deleteData"
				@on-hide="hideDeleteDialog"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
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
	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Building",
			url: "/building",
			item: {
				label: route.params.Building_Name,
			},
		},
	};

	const Building_Data = ref(null);
	const AppartmentData = ref(null);

	// export related states
	const exportTable = ref(false);

	// add related states
	const showAddDialog = ref(false);

	// edit related states
	const editableData = ref(null);
	const showEditDialog = ref(false);

	// delete data related states
	const showDeleteDialog = ref(false);
	const deleteRowId = ref(null);

	// methods
	onMounted(async () => {
		store.loading = true;
		await fetchBuildingData();
		await fetchData();
		store.loading = false;
	});

	const fetchBuildingData = async () => {
		const response = await Building.fetchAll();

		if (response.status === "success") {
			Building_Data.value = response.data.data.filter(
				(data) => data.Building_Name === route.params.Building_Name
			)[0];
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: "Apartment Delete Failed",
				life: 3000,
			});
		}
	};

	const fetchData = async () => {
		const res = await Appartment.fetchAll();

		if (res.status === "success") {
			AppartmentData.value = res.data.data.filter(
				(data) => data.Building_Name === route.params.Building_Name
			);
		}
	};

	// export related method
	const exportCSV = (event) => {
		exportTable.value = true;
	};

	// add related methods
	const showDialogAdd = () => {
		showAddDialog.value = true;
	};

	const hideDialogAdd = () => {
		showAddDialog.value = false;
		fetchData();
	};

	// edit related methods
	const editData = (data) => {
		editableData.value = data;
		showEditDialog.value = true;
	};

	const hideEditDialog = async () => {
		editableData.value = null;
		showEditDialog.value = false;
		store.loading = true;
		await fetchData();
		store.loading = false;
	};

	// delete related methods
	const deleteData = (id: string) => {
		showDeleteDialog.value = true;
		deleteRowId.value = id;
	};

	const hideDeleteDialog = async () => {
		showDeleteDialog.value = false;
		deleteRowId.value = null;
		await fetchData();
	};
</script>

<style scoped></style>
