<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<Toolbar class="mb-4">
			<template #start>
				<Button
					label="New"
					icon="pi pi-plus"
					class="p-button-success mr-2"
					@click="createData"
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
			dataKey="_id"
			:paginator="true"
			:rows="10"
			:filters="filters"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
			responsiveLayout="scroll"
		>
			<template #header>
				<div
					class="table-header flex align-items-center justify-content-between"
				>
					<h5 class="mb-2 md:m-0 p-as-md-center">
						Manage Buildings
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
				field="Building_Name"
				header="Building Name"
				style="min-width: 16rem"
			>
				<template #body="slotProps">
					<a
						:href="
							'building/' + slotProps?.data?.Building_Name
						"
						>{{ slotProps?.data?.Building_Name }}</a
					>
				</template>
			</Column>

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
						class="p-button-rounded p-button-warning text-white mr-2"
						@click="editData(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-danger text-white"
						@click="deleteData(slotProps.data._id)"
					/>
				</template>
			</Column>
		</DataTable>

		<BuildingAdd
			:show-dialog="showAddDialog"
			@hide-dialog="hideDialogAdd"
		/>

		<BuildingEdit
			:data="editableData"
			:show-dialog="showEditDialog"
			@on-submit="handleEditSubmit"
			@on-hide="hideEditDialog"
		/>

		<BuildingDelete
			:building-id="deleteRowId"
			:show-dialog="showDeleteDialog"
			@on-hide="hideDeleteDialog"
		/>
	</div>
</template>

<script setup lang="ts">
	import Building from "~/services/Building.Service";
	import { useStore } from "~~/src/stores/store";
	import { FilterMatchMode } from "primevue/api";

	// define page meta
	definePageMeta({
		title: "Building",
		middleware: ["auth"],
	});

	// define hooks
	const router = useRouter();
	const store = useStore();

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
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	// add related states
	const showAddDialog = ref(false);

	// edit data related states
	const showEditDialog = ref(false);
	const editableData = ref(null);

	// delete data related states
	const showDeleteDialog = ref(false);
	const deleteRowId = ref(null);

	// methods
	onMounted(async () => {
		store.loading = true;
		await fetchData();
		store.loading = false;
	});

	// export table
	const exportCSV = () => {
		dt.value.exportCSV();
	};

	// fetch table data form the backend
	const fetchData = async () => {
		const res = await Building.fetchAll();

		if (res.status === "success") {
			BuildingData.value = res.data.data;
		}
	};

	// redirect to details page
	const viewData = (building) => {
		router.push("building/" + building.Building_Name);
	};

	// Create related methods
	const createData = () => {
		showAddDialog.value = true;
	};

	const hideDialogAdd = async () => {
		showAddDialog.value = false;
		await fetchData();
	};

	// edit data related methods
	const editData = (data) => {
		editableData.value = toRaw(data);
		showEditDialog.value = true;
	};

	const hideEditDialog = async () => {
		editableData.value = null;
		showEditDialog.value = false;
		await fetchData();
	};

	const handleEditSubmit = async (status: Boolean) => {
		if (status) {
			hideEditDialog();
			store.loading = true;
			await fetchData();
			store.loading = false;
		}
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

<style lang="scss" scoped></style>
