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
						!selectedApartments || !selectedApartments.length
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
			:value="AppartmentData"
			v-model:selection="selectedApartments"
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
						Manage Apartments
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
				field="Unit_Name"
				header="Unit Name"
				style="min-width: 16rem"
			/>

			<Column
				field="Descriptions"
				header="Descriptions"
				style="min-width: 16rem"
			/>

			<Column
				field="Category"
				header="Category"
				style="min-width: 10rem"
			/>

			<Column
				field="Number_of_room"
				header="Number_of_room"
				style="min-width: 10rem"
			/>

			<Column
				field="Rent_Charge"
				header="Rent Charge"
				style="min-width: 10rem"
			/>

			<Column
				field="Status"
				header="Status"
				style="min-width: 10rem"
			/>

			<Column
				:exportable="false"
				style="min-width: 8rem"
				header="Action"
			>
				<template #body="slotProps">
					<Button
						icon="pi pi-pencil"
						class="p-button-rounded p-button-success mr-2"
						@click="editProduct(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-warning"
						@click="confirmDelete(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>

		<ApartmentAdd
			:show-dialog="showAddDialog"
			@hide-dialog="hideDialogAdd"
			@apartment-added="apartmentAdded"
		/>

		<Dialog
			:visible="deleteDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
		>
			<div class="confirmation-content">
				<i
					class="pi pi-exclamation-triangle mr-3"
					style="font-size: 2rem"
				/>
				<span v-if="apartmentToDelete">
					Are you sure you want to delete the selected Apartment?
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
	import { FilterMatchMode } from "primevue/api";
	import { useToast } from "primevue/usetoast";

	// define page meta
	definePageMeta({
		title: "Appartments",
		middleware: ["auth"],
	});

	// define hooks
	const toast = useToast();

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Appartments",
			url: "/appartments",
		},
	};

	const dt = ref();
	const AppartmentData = ref(null);
	const selectedApartments = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const showAddDialog = ref(false);
	const apartmentToDelete = ref(null);
	const deleteDialog = ref(false);

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
		const res = await Appartment.fetchAll();

		if (res.status === "success") {
			AppartmentData.value = res.data.data;
		}
	};

	const apartmentAdded = () => {
		fetchData();
	};

	const confirmDelete = (apartment) => {
		apartmentToDelete.value = apartment;
		deleteDialog.value = true;
	};

	const deleteSelectedApartment = async () => {
		const response = await Appartment.Delete(apartmentToDelete.value._id);

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
