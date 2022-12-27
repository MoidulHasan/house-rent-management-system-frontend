<template>
	<div>
		<DataTable
			ref="dt"
			:value="apartmentData?.Billing"
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
						Manage Billing

						<Button
							icon="pi pi-plus"
							class="p-button-success ml-2 p-1"
							@click="createData"
						/>
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
				field="BillMonthAndYear"
				header="Month and Year"
				style="width: 15%"
			>
				<template #body="slotProps">
					{{ convertDate(slotProps?.data?.BillMonthAndYear) }}
				</template>
			</Column>

			<Column field="Bills" header="Biller Name" style="width: 10%">
				<template #body="slotProps">
					{{ rentersInfo(slotProps.data.RenterId)?.Name }}
				</template>
			</Column>

			<Column field="Bills" header="Biller Phone" style="width: 10%">
				<template #body="slotProps">
					{{ rentersInfo(slotProps.data.RenterId)?.Phone }}
				</template>
			</Column>

			<Column field="Bills" header="Bills" style="width: 20%">
				<template #body="slotProps">
					<p
						v-for="(bill, index) in slotProps.data?.Bills"
						:key="bill._id"
					>
						{{
							index +
							1 +
							". " +
							bill.BillName +
							" - " +
							bill.Amount
						}}
					</p>
				</template>
			</Column>

			<Column field="Bills" header="Total Bill" style="width: 10%">
				<template #body="slotProps">
					{{ calculateTotalBill(slotProps.data.Bills) }}
				</template>
			</Column>

			<Column field="Status" header="Status" style="width: 10%" />

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
		<BillCreate
			:showDialog="showCreateDialog"
			:apartmentId="apartmentData?._id"
			:renterId="RentersData?._id"
			@hideDialog="hideCreateDialog"
		/>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import Renter from "~/services/Renter.Service";
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

	const props = defineProps<{
		apartmentData: Object | null;
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
	const RentersData = ref();

	// create bill related states
	const showCreateDialog = ref(false);

	// delete single row
	const rowIdToDelete = ref(null);
	const deleteRowDialog = ref(false);

	// methods
	// convert month and year
	const convertDate = (dateSting: string) => {
		const month = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const dateArray = dateSting.split("/");

		return month[+dateArray[0] - 1] + ", " + dateArray[1];
	};

	// calculate total bill
	const calculateTotalBill = (bills) => {
		let sum = 0;
		for (let i = 0; i < bills?.length; i++) {
			sum += bills[i]?.Amount;
		}

		return sum;
	};

	// find renter info
	const rentersInfo = (renterId) => {
		return RentersData.value.filter(
			(renter) => renter._id == renterId
		)[0];
	};

	const createData = () => {
		showCreateDialog.value = true;
	};

	const hideCreateDialog = () => {
		showCreateDialog.value = false;
		fetchRenter();
	};

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

	const fetchRenter = async () => {
		const res = await Renter.fetchAll();

		if (res.status === "success") {
			RentersData.value = res.data.data;
		}
	};

	onMounted(() => {
		fetchRenter();
	});

	onUpdated(() => {
		if (props.exportTable) {
			exportCSV();
		}
	});
</script>

<style scoped></style>
