<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Create Renter"
			:modal="true"
			class="p-fluid"
			:closable="false"
			:draggable="false"
		>
			<div class="field">
				<label for="name">Name</label>
				<InputText
					id="name"
					v-model.trim="renterData.Name"
					required="true"
					autofocus
					:class="{
						'p-invalid': submitted && !renterData.Name,
					}"
				/>
				<small class="p-error" v-if="submitted && !renterData.Name">
					Name is required.
				</small>
			</div>

			<div class="field">
				<label for="NID">NID Number</label>
				<InputText
					id="NID"
					v-model="renterData.NID"
					required="true"
				/>
				<small class="p-error" v-if="submitted && !renterData.NID">
					NID Number is required.
				</small>
			</div>

			<div class="field">
				<label for="NID">Phone Number</label>
				<InputText
					id="NID"
					v-model="renterData.Phone"
					required="true"
				/>
				<small
					class="p-error"
					v-if="submitted && !renterData.Phone"
				>
					Phone Number is required.
				</small>
			</div>

			<div class="field">
				<label for="Rent_Start_Date">Rent Start Date</label>
				<Calendar
					id="Rent_Start_Date"
					v-model="renterData.Rent_Start_Date"
					required="true"
				/>
				<small
					class="p-error"
					v-if="submitted && !renterData.Phone"
				>
					Rent Start Date is required.
				</small>
			</div>

			<div class="field">
				<label for="Permanent_Address">Permanent Address</label>
				<Textarea
					id="Permanent_Address"
					v-model="renterData.Permanent_Address"
					required="true"
					rows="2"
				/>
				<small
					class="p-error"
					v-if="submitted && !renterData.Permanent_Address"
				>
					Permanent Address is required.
				</small>
			</div>

			<div class="field">
				<label for="Building_Name" class="mb-3">
					Building Name
				</label>
				<Dropdown
					id="Building_Name"
					v-model="renterData.Building_Name"
					:options="buildingNames"
					@change="fetchApartmentNameOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Select Building"
				/>
				<small
					class="p-error"
					v-if="submitted && !renterData.Building_Name"
				>
					Building Name is required.
				</small>
			</div>

			<div class="field">
				<label for="Building_Name" class="mb-3">
					Apartment Name
				</label>
				<Dropdown
					id="Building_Name"
					v-model="renterData.Apartment_Name"
					:options="apartmentNames"
					optionLabel="label"
					optionValue="value"
					placeholder="Select Apartment"
					:disabled="!renterData.Building_Name"
				/>
				<small
					class="p-error"
					v-if="submitted && !renterData.Apartment_Name"
				>
					Apartment Name is required.
				</small>
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
					@click="saveRenter"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import Building from "~/services/Building.Service";
	import Renter from "~/services/Renter.Service";
	import { useToast } from "primevue/usetoast";

	interface Renter {
		_id: string;
		Name: string;
		NID: string;
		Phone: string;
		Rent_Start_Date: string;
		Permanent_Address: string;
		Building_Name: string;
		Apartment_Name: string;
	}

	// define props
	const props = defineProps<{
		showDialog: boolean;
		data: Renter | null;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
	}>();

	const toast = useToast();

	// define states
	const renterData = ref({
		Name: null,
		NID: null,
		Phone: null,
		Rent_Start_Date: null,
		Permanent_Address: null,
		Building_Name: null,
		Apartment_Name: null,
	});
	const buildingNames = ref([]);
	const apartmentNames = ref([]);

	const submitted = ref(false);

	// methods
	const hideDialog = () => {
		submitted.value = false;
		emits("hideDialog");
	};

	const saveRenter = async () => {
		submitted.value = true;

		const response = await Renter.Update(
			props.data._id,
			renterData.value
		);

		if (response.status === "success") {
			hideDialog();

			renterData.value = {
				Name: null,
				NID: null,
				Phone: null,
				Rent_Start_Date: null,
				Permanent_Address: null,
				Building_Name: null,
				Apartment_Name: null,
			};
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Apartment Update Successful",
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

	const fetchBuldingNameOptions = async () => {
		const response = await Building.fetchAll();

		buildingNames.value =
			response.status === "success"
				? response.data.data.map((building) => {
						return {
							label: building.Building_Name,
							value: building.Building_Name,
						};
				  })
				: null;
	};

	const fetchApartmentNameOptions = async () => {
		const response = await Appartment.fetchAll();

		apartmentNames.value =
			response.status === "success"
				? response.data.data
						.filter(
							(apartment) =>
								apartment.Building_Name ===
								renterData.value.Building_Name
						)
						.map((apartment) => {
							return {
								label: apartment.Unit_Name,
								value: apartment.Unit_Name,
							};
						})
				: null;
	};

	onMounted(() => {
		fetchBuldingNameOptions();
		fetchApartmentNameOptions();

		if (props.data) {
			renterData.value = props.data;
		}
	});

	onUpdated(() => {
		if (props.data) {
			renterData.value = props.data;
		}

		fetchBuldingNameOptions();
		fetchApartmentNameOptions();
	});
</script>

<style scoped></style>
