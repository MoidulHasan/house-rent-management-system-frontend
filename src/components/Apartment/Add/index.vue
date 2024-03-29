<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Apartment Details"
			:modal="true"
			class="p-fluid"
			:closable="false"
		>
			<div class="field">
				<label for="name">Apartment Name</label>
				<InputText
					id="name"
					v-model.trim="apartmentData.Unit_Name"
					required="true"
					autofocus
					:class="{
						'p-invalid':
							submitted && !apartmentData.Unit_Name,
					}"
				/>
				<small
					class="p-error"
					v-if="submitted && !apartmentData.Unit_Name"
				>
					Name is required.
				</small>
			</div>

			<div class="field">
				<label for="description">Description</label>
				<Textarea
					id="description"
					v-model="apartmentData.Descriptions"
					required="true"
					rows="3"
					cols="20"
				/>
			</div>

			<div class="field">
				<label for="Category" class="mb-3">Category</label>
				<Dropdown
					id="Category"
					v-model="apartmentData.Category"
					:options="categories"
					optionLabel="label"
					optionValue="value"
					placeholder="Select a Category"
				>
					<template #value="slotProps">
						<div
							v-if="
								slotProps.value && slotProps.value.value
							"
						>
							<span
								:class="
									'product-badge status-' +
									slotProps.value.value
								"
								>{{ slotProps.value.label }}</span
							>
						</div>
						<div
							v-else-if="
								slotProps.value &&
								!slotProps.value.value
							"
						>
							<span
								:class="
									'product-badge status-' +
									slotProps.value.toLowerCase()
								"
								>{{ slotProps.value }}</span
							>
						</div>
						<span v-else>
							{{ slotProps.placeholder }}
						</span>
					</template>
				</Dropdown>
				<small
					class="p-error"
					v-if="submitted && !apartmentData.Category"
				>
					Category is required.
				</small>
			</div>

			<div class="field">
				<label for="Building_Name" class="mb-3">
					Building Name
				</label>
				<Dropdown
					id="Building_Name"
					v-model="apartmentData.Building"
					:options="buildingNames"
					optionLabel="label"
					optionValue="value"
					placeholder="Select Building"
				/>
				<small
					class="p-error"
					v-if="submitted && !apartmentData.Building"
				>
					Building Name is required.
				</small>
			</div>

			<div class="grid">
				<div class="col-6 field">
					<label for="Status" class="mb-3">Status</label>
					<Dropdown
						id="Status"
						v-model="apartmentData.Status"
						:options="status"
						optionLabel="label"
						optionValue="value"
						placeholder="Select a Status"
					>
						<template #value="slotProps">
							<div
								v-if="
									slotProps.value &&
									slotProps.value.value
								"
							>
								<span
									:class="
										'product-badge status-' +
										slotProps.value.value
									"
									>{{ slotProps.value.label }}</span
								>
							</div>
							<div
								v-else-if="
									slotProps.value &&
									!slotProps.value.value
								"
							>
								<span
									:class="
										'product-badge status-' +
										slotProps.value.toLowerCase()
									"
									>{{ slotProps.value }}</span
								>
							</div>
							<span v-else>
								{{ slotProps.placeholder }}
							</span>
						</template>
					</Dropdown>
					<small
						class="p-error"
						v-if="submitted && !apartmentData.Status"
					>
						Status is required.
					</small>
				</div>

				<div class="col-6 field">
					<label for="price" class="mb-3">Rent Charge</label>
					<InputNumber
						id="price"
						v-model="apartmentData.Rent_Charge"
					/>
					<small
						class="p-error"
						v-if="submitted && !apartmentData.Rent_Charge"
					>
						Rent Charge is required.
					</small>
				</div>
			</div>

			<div class="grid">
				<div class="field col-6">
					<label for="Number_of_room">Number of room</label>
					<InputNumber
						id="Number_of_room"
						v-model="apartmentData.Number_of_room"
						integeronly
					/>
					<small
						class="p-error"
						v-if="submitted && !apartmentData.Number_of_room"
					>
						Number of room is required.
					</small>
				</div>

				<div class="field col-6">
					<label for="Number_of_Bathroom"
						>Number of Bathroom</label
					>
					<InputNumber
						id="Number_of_Bathroom"
						v-model="apartmentData.Number_of_Bathroom"
						integeronly
					/>
					<small
						class="p-error"
						v-if="
							submitted &&
							!apartmentData.Number_of_Bathroom
						"
					>
						Number of bathroom room is required.
					</small>
				</div>
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
					@click="saveApartment"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";
	import Building from "~/services/Building.Service";
	import { useToast } from "primevue/usetoast";

	// define props
	const props = defineProps<{
		showDialog: boolean;
		building?: {
			name: string;
			id: string;
		};
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
	}>();

	// hooks
	const toast = useToast();

	// define states
	const apartmentData = ref({
		Unit_Name: null,
		Descriptions: null,
		Building: null,
		Category: null,
		Status: "Unoccupied",
		Rent_Charge: null,
		Number_of_room: null,
		Number_of_Bathroom: null,
	});
	const buildingNames = ref([]);

	const submitted = ref(false);

	const categories = ref([
		{ label: "Residential", value: "Residential" },
		{ label: "Office", value: "Office" },
	]);

	const status = ref([
		{ label: "Unoccupied", value: "Unoccupied" },
		{ label: "Occupied", value: "Occupied" },
	]);

	// methods
	const hideDialog = () => {
		submitted.value = false;
		emits("hideDialog");
	};

	const saveApartment = async () => {
		submitted.value = true;

		if (
			!apartmentData.value.Unit_Name ||
			!apartmentData.value.Building ||
			!apartmentData.value.Status ||
			!apartmentData.value.Rent_Charge ||
			!apartmentData.value.Number_of_room ||
			!apartmentData.value.Number_of_Bathroom
		) {
			return;
		}

		const response = await Appartment.Create(apartmentData.value);

		if (response.status === "success") {
			hideDialog();

			apartmentData.value = {
				Unit_Name: null,
				Descriptions: null,
				Building: null,
				Category: null,
				Status: null,
				Rent_Charge: null,
				Number_of_room: null,
				Number_of_Bathroom: null,
			};
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Apartment Add Successful",
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
							value: building._id,
						};
				  })
				: null;
	};

	onMounted(() => {
		if (props.building) {
			buildingNames.value = [
				{
					label: props.building.name,
					value: props.building.id,
				},
			];

			apartmentData.value.Building = props.building.id;
		} else {
			fetchBuldingNameOptions();
		}
	});

	onUpdated(() => {
		if (props.building) {
			buildingNames.value = [
				{
					label: props.building.name,
					value: props.building.id,
				},
			];

			apartmentData.value.Building = props.building.id;
		} else {
			fetchBuldingNameOptions();
		}
	});
</script>

<style scoped></style>
