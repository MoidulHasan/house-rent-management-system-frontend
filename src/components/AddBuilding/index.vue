<template>
	<div>
		<Dialog
			v-model:visible="showDialog"
			:style="{ width: '450px' }"
			header="Building Create"
			:modal="true"
			class="p-fluid"
			:closable="false"
		>
			<div class="field">
				<label for="name">Building Name</label>
				<InputText
					id="name"
					v-model="buildingData.Building_Name"
					required="true"
					autofocus
					:class="{
						'p-invalid':
							submitted && !buildingData.Building_Name,
					}"
				/>
				<small
					class="p-error"
					v-if="submitted && !buildingData.Building_Name"
					>Name is required.</small
				>
			</div>

			<div class="field">
				<label for="Address">Address</label>
				<Textarea
					id="Address"
					v-model="buildingData.Address"
					required="true"
					rows="2"
					cols="20"
				/>
			</div>

			<div class="field">
				<label for="description">Description</label>
				<Textarea
					id="description"
					v-model="buildingData.Descriptions"
					required="true"
					rows="3"
					cols="20"
				/>
			</div>

			<div class="field">
				<label for="Caretaker_name">Caretaker Name</label>
				<InputText
					id="Caretaker_name"
					v-model="buildingData.Caretaker_Name"
					required="true"
					autofocus
				/>
			</div>

			<div class="field">
				<label for="Caretaker_Phone">Caretaker Phone</label>
				<InputText
					id="Caretaker_Phone"
					v-model="buildingData.Caretaker_Phone"
					required="true"
					autofocus
				/>
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
					@click="saveBuilding"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Building from "~/services/Building.Service";

	import { useToast } from "primevue/usetoast";

	// define props
	const props = defineProps<{
		showDialog?: boolean;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "hideDialog"): void;
		(e: "buildingAdded"): void;
	}>();

	// hooks
	const toast = useToast();

	// define states
	const buildingData = ref({
		Building_Name: null,
		Descriptions: null,
		Address: null,
		Caretaker_Name: null,
		Caretaker_Phone: null,
	});

	const submitted = ref(false);

	// methods
	const hideDialog = () => {
		emits("hideDialog");
	};

	const saveBuilding = async () => {
		const response = await Building.Create(buildingData.value);

		if (response.status === "success") {
			hideDialog();

			buildingData.value = {
				Building_Name: null,
				Descriptions: null,
				Address: null,
				Caretaker_name: null,
				Caretaker_Phone: null,
			};

			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Building Add Successful",
				life: 3000,
			});

			emits("buildingAdded");
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
