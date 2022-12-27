<template>
	<div>
		<Dialog
			v-model:visible="showDialog"
			:style="{ width: '450px' }"
			header="Bill Create"
			:modal="true"
			class="p-fluid"
			:closable="false"
			:draggable="false"
		>
			<div class="grid">
				<div class="field col-6">
					<label for="Month">Bill Month</label>
					<Dropdown
						id="Month"
						v-model="billMonth"
						:options="months"
						option-label="label"
						option-value="value"
						placeholder="Select Month"
						required="true"
						autofocus
					/>
				</div>

				<div class="field col-6">
					<label for="Year">Bill Year</label>
					<InputNumber
						id="Year"
						v-model="billYear"
						required="true"
						autofocus
						:min="1000"
						mode="decimal"
						:useGrouping="false"
					/>
				</div>
			</div>

			<div class="grid">
				<div class="field col-5">
					<label for="name">Bill Name</label>
					<InputText
						id="name"
						v-model="BillName"
						required="true"
						autofocus
					/>
				</div>

				<div class="field col-5">
					<label for="Amount">Bill Amount</label>
					<InputText
						id="Amount"
						v-model="Amount"
						required="true"
						autofocus
					/>
				</div>

				<div class="flex align-item-center col-2">
					<Button
						icon="pi pi-check"
						class="p-button-text"
						@click="addBill"
					/>
				</div>
			</div>

			<div
				class="grid"
				v-for="(billData, index) in Bills"
				:key="billData.BillName"
			>
				<p class="col-5">
					{{ index + 1 + ". " + billData.BillName }}
				</p>
				<p class="col-5">{{ billData.Amount }}</p>
				<p class="col-2">
					<Button
						icon="pi pi-times"
						class="p-button-text text-orange-500"
						@click="() => removeBill(index)"
					/>
				</p>
			</div>

			<template #footer>
				<Button
					label="Cancel"
					icon="pi pi-times"
					class="p-button-text"
					@click="hideDialog"
				/>
				<Button
					label="Save"
					icon="pi pi-check"
					class="p-button-text"
					@click="saveBill"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Billing from "~/services/Billing.Service";

	import { useToast } from "primevue/usetoast";

	// define props
	const props = defineProps<{
		apartmentId?: string | null | undefined;
		renterId?: string | null | undefined;
		showDialog?: boolean;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
	}>();

	// hooks
	const toast = useToast();

	// define states
	const Bills = ref([]);
	const billMonth = ref(null);
	const billYear = ref(null);
	const months = ref([
		{
			label: "January",
			value: 1,
		},
		{
			label: "February",
			value: 2,
		},
		{
			label: "March",
			value: 3,
		},
		{
			label: "April",
			value: 4,
		},
		{
			label: "May",
			value: 5,
		},
		{
			label: "June",
			value: 6,
		},
		{
			label: "July",
			value: 7,
		},
		{
			label: "August",
			value: 8,
		},
		{
			label: "September",
			value: 9,
		},
		{
			label: "October",
			value: 10,
		},
		{
			label: "November",
			value: 11,
		},
		{
			label: "December",
			value: 12,
		},
	]);

	const BillName = ref(null);
	const Amount = ref(null);

	// methods
	const addBill = () => {
		if (BillName.value && Amount.value) {
			Bills.value = [
				...Bills.value,
				{
					BillName: BillName.value,
					Amount: Amount.value,
				},
			];

			BillName.value = null;
			Amount.value = null;
		}
	};

	const removeBill = (index) => {
		Bills.value.splice(index, 1);
	};

	const hideDialog = () => {
		emits("hideDialog");
	};

	const saveBill = async () => {
		console.log(props);
		const BillData = {
			BillMonthAndYear: billMonth.value + "/" + billYear.value,
			RenterId: props.renterId,
			Status: "Unpaid",
			Bills: Bills.value,
		};

		const response = await Billing.Create(props.apartmentId, BillData);

		if (response.status === "success") {
			hideDialog();

			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Building Add Successful",
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
</script>

<style scoped></style>
