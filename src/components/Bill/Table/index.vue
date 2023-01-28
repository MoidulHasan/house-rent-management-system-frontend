<template>
	<div>
		<DataTable
			ref="dt"
			:value="apartmentData?.Bills"
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
				</div>
			</template>

			<Column
				field="BillMonthAndYear"
				header="Month and Year"
				style="width: 10%"
				:sortable="true"
			>
				<template #body="slotProps">
					{{ convertDate(slotProps?.data?.BillMonthAndYear) }}
				</template>
			</Column>

			<Column field="Bills" header="Biller Name" style="width: 15%">
				<template #body="slotProps">
					<a :href="'/admin/users/'">{{
						apartmentData.renter.User.name
					}}</a>
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
					{{ calculateTotalBill(slotProps.data?.Bills) }}
				</template>
			</Column>

			<Column field="Status" header="Status" style="width: 10%" />

			<Column :exportable="false" style="width: 15%" header="Action">
				<template #body="slotProps">
					<Button
						icon="pi pi-download"
						class="p-button-rounded p-button-info mr-2"
						v-tooltip.top="'Download Invoice'"
						@click="viewData(slotProps.data)"
					/>
					<Button
						icon="pi pi-pencil"
						class="p-button-rounded p-button-info mr-2"
						v-tooltip.top="'Edit Bill'"
						:disabled="slotProps.data.Status === 'Paid'"
						@click="editBill(slotProps.data)"
					/>
					<Button
						icon="pi pi-check"
						class="p-button-rounded p-button-success mr-2"
						v-tooltip.top="'Accept Payment'"
						:disabled="slotProps.data.Status === 'Paid'"
						@click="acceptPayment(slotProps.data._id)"
					/>
				</template>
			</Column>
		</DataTable>

		<BillCreate
			:showDialog="showCreateDialog"
			:apartmentId="apartmentData?._id"
			:rentersData="apartmentData?.renter?.User"
			@hideDialog="hideCreateDialog"
		/>

		<BillEdit
			:show-dialog="showEditDialog"
			:apartment-id="apartmentData?._id"
			:renters-data="apartmentData?.renter?.User"
			:bill-data="billDataToEdit"
			@hide-dialog="hideEditDialog"
		/>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import Renter from "~/services/Renter.Service";
	import { FilterMatchMode } from "primevue/api";
	import { useToast } from "primevue/usetoast";
	import BillService from "~/services/Billing.Service";

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

	// create bill related states
	const showCreateDialog = ref(false);
	const showEditDialog = ref(false);

	// delete single row
	const billDataToEdit = ref(null);

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

	const editBill = (billData) => {
		billDataToEdit.value = billData;

		showEditDialog.value = true;
	};

	const hideEditDialog = () => {
		showEditDialog.value = false;
		window.location.reload();
	};

	const hideCreateDialog = () => {
		showCreateDialog.value = false;
		window.location.reload();
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

	const acceptPayment = async (billId) => {
		const response = await BillService.acceptPayment(
			props.apartmentData._id,
			billId
		);

		if (response.status === "success") {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Payment Accepted",
				life: 3000,
			});
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: response.message,
				life: 3000,
			});
		}
	};

	onMounted(() => {
		console.log(props);
	});

	onUpdated(() => {
		if (props.exportTable) {
			exportCSV();
		}
	});
</script>

<style scoped></style>
