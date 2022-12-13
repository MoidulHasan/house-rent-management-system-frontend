<template>
	<div>
		<Dialog
			v-model:visible="showDialog"
			:style="{ width: '450px' }"
			header="Apartment Details"
			:modal="true"
			class="p-fluid"
			:closable="false"
		>
			<div class="field">
				<label for="name">Unit Name</label>
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
					>Name is required.</small
				>
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
			</div>

			<div class="field">
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
			</div>

			<div class="formgrid grid">
				<div class="field col">
					<label for="price">Rent Charge</label>
					<InputNumber
						id="price"
						v-model="apartmentData.Rent_Charge"
					/>
				</div>
				<div class="field col">
					<label for="Number_of_room">Number of room</label>
					<InputNumber
						id="Number_of_room"
						v-model="apartmentData.Number_of_room"
						integeronly
					/>
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
	import { useToast } from "primevue/usetoast";

	// define props
	const props = defineProps<{
		showDialog?: boolean;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
		(e: "apartmentAdded"): void;
	}>();

	// hooks
	const toast = useToast();

	// define states
	const apartmentData = ref({
		Unit_Name: null,
		Descriptions: null,
		Category: null,
		Status: null,
		Rent_Charge: null,
		Number_of_room: null,
	});
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
		emits("hideDialog");
	};

	const saveApartment = async () => {
		const response = await Appartment.Create(apartmentData.value);

		console.log(response);

		if (response.status === "success") {
			hideDialog();

			apartmentData.value = {
				Unit_Name: null,
				Descriptions: null,
				Category: null,
				Status: null,
				Rent_Charge: null,
				Number_of_room: null,
			};
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Apartment Add Successful",
				life: 3000,
			});

			emits("apartmentAdded");
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
