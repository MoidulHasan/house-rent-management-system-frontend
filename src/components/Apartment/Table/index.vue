<template>
	<div>
		<DataTable
			ref="dt"
			:value="apartmentData"
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
				field="Unit_Name"
				header="Unit Name"
				style="min-width: 8rem"
			>
				<template #body="slotProps">
					<a
						:href="
							'/apartments/' +
							slotProps?.data?.Building_Name +
							'/' +
							slotProps?.data?.Unit_Name
						"
					>
						{{ slotProps?.data?.Unit_Name }}
					</a>
				</template>
			</Column>

			<Column
				field="Building_Name"
				header="Building Name"
				style="width: 8%"
			/>

			<Column
				field="Descriptions"
				header="Descriptions"
				style="width: 20%"
			/>

			<Column field="Category" header="Category" style="width: 10%" />

			<Column
				field="Number_of_room"
				header="Number_of_room"
				style="width: 8%"
			/>

			<Column
				field="Rent_Charge"
				header="Rent Charge"
				style="width: 8%"
			/>

			<Column field="Status" header="Status" style="width: 8%" />

			<Column
				:exportable="false"
				style="min-width: 20%"
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
	import Appartment from "~/services/Appartment.Service";
	import { FilterMatchMode } from "primevue/api";
	import { useToast } from "primevue/usetoast";

	interface Apartment {
		_id: string;
		Unit_Name: string;
		Descriptions: string;
		Building_Name: string;
		Category: string;
		Status: string;
		Rent_Charge: number;
		Number_of_room: number;
	}

	// define props
	const props = defineProps<{
		apartmentData: Apartment[] | null;
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
		router.push(
			"/apartments/" + data.Building_Name + "/" + data.Unit_Name
		);
	};
	const exportCSV = () => {
		emits("onExported");
		dt.value.exportCSV();
	};

	const deleteRow = (apartment) => {
		emits("deleteData", apartment._id);
	};

	const editRow = (apartment) => {
		emits("editData", apartment);
	};

	onUpdated(() => {
		if (props.exportTable) {
			exportCSV();
		}
	});
</script>

<style scoped></style>
