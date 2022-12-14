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
			@on-exported="exported"
		/>

		<ApartmentAdd
			:show-dialog="showAddDialog"
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
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import { useStore } from "~~/src/stores/store";

	// define page meta
	definePageMeta({
		title: "Appartments",
		middleware: ["auth"],
	});

	// hooks
	const store = useStore();

	// states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Appartments",
			url: "/appartments",
		},
	};
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
	onMounted(() => {
		fetchData();
	});

	const fetchData = async () => {
		const res = await Appartment.fetchAll();

		if (res.status === "success") {
			AppartmentData.value = res.data.data;
		}
	};

	// export related method
	const exportCSV = (event) => {
		exportTable.value = true;
	};

	const exported = () => {
		exportTable.value = false;
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

<style lang="scss" scoped></style>
