<template>
	<div class="p-5 flex align-items-center justify-content-center">
		<h3>Bill List for : {{ apartmentData?.Unit_Name }}</h3>
	</div>
	<div class="p-5 flex align-items-center justify-content-center">
		<DataTable
			ref="dt"
			:value="billData"
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
			style="max-width: 100rem"
		>
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
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import AppartmentService from "~~/src/services/Appartment.Service";
	import { useAuthStore } from "~~/src/stores/auth.store";

	definePageMeta({
		title: "Bills",
		middleware: ["auth"],
		layout: "userpanel",
	});

	const route = useRoute();
	const authStore = useAuthStore();

	const apartmentData = ref(null);

	const billData = ref(null);

	const fetchApartmentData = async () => {
		const response = await AppartmentService.fetchAll();

		apartmentData.value = response.data.data.filter(
			(apartment) => apartment._id === route.params.apartment_id
		)[0];

		billData.value = apartmentData.value.Bills?.filter(
			(bill) => bill?.User === authStore.user._id
		);
	};

	const calculateTotalBill = (bills) => {
		let sum = 0;
		for (let i = 0; i < bills?.length; i++) {
			sum += bills[i]?.Amount;
		}

		return sum;
	};

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

	onMounted(async () => {
		await fetchApartmentData();

		console.log(apartmentData);
	});
</script>

<style scoped></style>
