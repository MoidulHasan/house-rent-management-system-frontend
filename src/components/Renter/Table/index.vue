<template>
	<div>
		<DataTable
			ref="dt"
			:value="rentersData"
			dataKey="_id"
			:paginator="true"
			:rows="10"
			:filters="filters"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
			responsiveLayout="scroll"
			class="w-full"
			headerClass="w-full"
		>
			<template #header>
				<div
					class="table-header flex align-items-center justify-content-between w-full"
				>
					<h5 class="mb-2 md:m-0 p-as-md-center">
						Manage Renters
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

			<Column field="Name" header="Name" style="min-width: 16rem">
				<template #body="slotProps">
					<a
						:href="
							'apartments/' +
							slotProps?.data?.Name +
							'/' +
							slotProps?.data?.Name
						"
					>
						{{ slotProps?.data?.Name }}
					</a>
				</template>
			</Column>

			<Column
				field="Building_Name"
				header="Building_Name"
				style="width: 10%"
			/>

			<Column
				field="Apartment_Name"
				header="Apartment Name"
				style="width: 10%"
			/>

			<Column field="NID" header="NID Number" style="width: 10%" />

			<Column field="Phone" header="Phone Number" style="width: 20%" />

			<Column
				field="Permanent_Address"
				header="Permanent_Address"
				style="width: 10%"
			/>

			<Column field="Status" header="Status" style="width: 10%" />

			<Column
				:exportable="false"
				style="min-width: 15%"
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
						@click="editRow(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-danger text-white"
						@click="deleteRow(slotProps.data)"
					/>
				</template>
			</Column>

			<template #empty>
				<EmptyContent />
			</template>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import Renter from "~/services/Renter.Service";
	import { FilterMatchMode } from "primevue/api";
	import { useToast } from "primevue/usetoast";

	interface Renter {
		Name: string;
		NID: string;
		Phone: string;
		Permanent_Address: string;
		Building_Name: string;
		Apartment_Name: string;
	}

	// define props
	const props = defineProps<{
		rentersData: Renter[] | null;
		exportTable: boolean;
	}>();

	//  define events
	const emits = defineEmits<{
		(e: "editData", value): void;
		(e: "deleteData", value): void;
		(e: "onExported"): void;
	}>();

	// define hooks
	const toast = useToast();
	const router = useRouter();

	// define states
	const dt = ref();
	const selectedApartments = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const deleteDialog = ref(false);

	// delete single row
	const rowIdToDelete = ref(null);
	const deleteRowDialog = ref(false);

	// methods

	// redirect to details page
	const viewData = (data) => {
		router.replace(
			"/renters/" + data.Building_Name + "/" + data.Unit_Name
		);
	};

	const exportCSV = () => {
		emits("onExported");
		dt.value.exportCSV();
	};

	const deleteRow = (data) => {
		emits("deleteData", data._id);
	};

	const editRow = (data) => {
		emits("editData", data);
	};

	onUpdated(() => {
		if (props.exportTable) {
			exportCSV();
		}
	});
</script>

<style scoped></style>
