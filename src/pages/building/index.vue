<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<Toolbar class="mb-4">
			<template #start>
				<Button
					label="New"
					icon="pi pi-plus"
					class="p-button-success mr-2"
					@click="showDialogAdd"
				/>
				<Button
					label="Delete"
					icon="pi pi-trash"
					class="p-button-danger"
					@click="confirmDeleteSelected"
					:disabled="
						!selectedBuilding || !selectedBuilding.length
					"
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

		<DataTable
			ref="dt"
			:value="BuildingData"
			v-model:selection="selectedBuilding"
			dataKey="_id"
			:paginator="true"
			:rows="10"
			:filters="filters"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
			responsiveLayout="scroll"
		>
			<template #header>
				<div
					class="table-header flex align-items-center justify-content-between"
				>
					<h5 class="mb-2 md:m-0 p-as-md-center">
						Manage Building
					</h5>
					<div class="p-input-icon-left">
						<i class="pi pi-search" />
						<InputText
							v-model="filters['global'].value"
							placeholder="Search..."
						/>
					</div>
				</div>
			</template>

			<Column
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false"
			/>

			<Column
				field="Building_Name"
				header="Building Name"
				style="min-width: 16rem"
			/>

			<Column
				field="Descriptions"
				header="Descriptions"
				style="min-width: 16rem"
			/>

			<Column
				field="Address"
				header="Address"
				style="min-width: 16rem"
			/>

			<Column
				field="Caretaker_Name"
				header="Caretaker Name"
				style="min-width: 10rem"
			/>

			<Column
				field="Caretaker_Phone"
				header="Caretaker Phone"
				style="min-width: 10rem"
			/>

			<Column
				:exportable="false"
				style="min-width: 15rem"
				header="Action"
			>
				<template #body="slotProps">
					<Button
						icon="pi pi-eye"
						class="p-button-rounded p-button-success mr-2"
						@click="viewData(slotProps.data)"
					/>
					<Button
						icon="pi pi-pencil"
						class="p-button-rounded p-button-success mr-2"
						@click="editData(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-danger text-white"
						@click="confirmDelete(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>

		<AddBuilding
			:show-dialog="showAddDialog"
			@hide-dialog="hideDialogAdd"
			@building-added="buildingAdded"
		/>

		<Dialog
			v-model:visible="deleteDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
		>
			<div class="confirmation-content">
				<i
					class="pi pi-exclamation-triangle mr-3"
					style="font-size: 2rem"
				/>
				<span v-if="buildingToDelete">
					Are you sure you want to delete the selected Building?
				</span>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					class="p-button-text"
					@click="deleteDialog = false"
				/>
				<Button
					label="Yes"
					icon="pi pi-check"
					class="p-button-text"
					@click="deleteSelectedApartment"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import Appartment from "~/services/Appartment.Service";
	import Building from "~/services/Building.Service";

	import { FilterMatchMode } from "primevue/api";
	import { useToast } from "primevue/usetoast";

	// define page meta
	definePageMeta({
		title: "Building",
		middleware: ["auth"],
	});

	// define hooks
	const toast = useToast();
	const router = useRouter();

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Building",
			url: "/building",
		},
	};

	const dt = ref();
	const BuildingData = ref(null);
	const selectedBuilding = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const showAddDialog = ref(false);
	const buildingToDelete = ref(null);
	const deleteDialog = ref(false);
	const confirmDeleteSelected = ref(false);

	// methods
	onMounted(() => {
		fetchData();
	});

	const exportCSV = () => {
		dt.value.exportCSV();
	};

	const showDialogAdd = () => {
		showAddDialog.value = true;
	};

	const hideDialogAdd = () => {
		showAddDialog.value = false;
	};

	const fetchData = async () => {
		const res = await Building.fetchAll();

		if (res.status === "success") {
			BuildingData.value = res.data.data;
		}
	};

	const buildingAdded = () => {
		fetchData();
	};

	const viewData = (building) => {
		console.log(building);
		router.push("building/" + building.Building_Name);
	};

	const editData = (building) => {
		console.log(building);
	};

	const confirmDelete = (apartment) => {
		buildingToDelete.value = apartment;
		deleteDialog.value = true;
	};

	const deleteSelectedApartment = async () => {
		const response = await Building.Delete(buildingToDelete.value._id);

		deleteDialog.value = false;

		if (response.status === "success") {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Apartment Delete Successful",
				life: 3000,
			});

			fetchData();
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: "Apartment Delete Failed",
				life: 3000,
			});
		}
	};
</script>

<style lang="scss" scoped></style>
