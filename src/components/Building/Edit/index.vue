<template>
	<div>
		<Dialog
			v-model:visible="showDialog"
			header="Edit Building Information"
			class="p-fluid"
			:style="{ width: '450px' }"
			:modal="true"
			:closable="false"
			:draggable="false"
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
				>
					Name is required.
				</small>
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
				<small
					class="p-error"
					v-if="submitted && !buildingData.Address"
				>
					Address is required.
				</small>
			</div>

			<div class="field">
				<label for="description1">Description</label>
				<Textarea
					id="description1"
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

	interface Building {
		_id: string;
		Building_Name: string;
		Descriptions: string | null;
		Address: string | null;
		Caretaker_Name: string | null;
		Caretaker_Phone: string | null;
	}

	// define props
	const props = defineProps<{
		showDialog: boolean;
		data: Building | null;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "onHide"): void;
		(e: "onSubmit", status: boolean): void;
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
	onMounted(() => {
		if (props.data) {
			buildingData.value = props.data;
		}
	});

	onUpdated(() => {
		if (props.data) {
			buildingData.value = props.data;
		}
	});

	const hideDialog = () => {
		submitted.value = false;

		buildingData.value = {
			Building_Name: null,
			Descriptions: null,
			Address: null,
			Caretaker_Name: null,
			Caretaker_Phone: null,
		};
		emits("onHide");
	};

	const saveBuilding = async () => {
		submitted.value = true;

		const response = await Building.Update(
			props.data._id,
			buildingData.value
		);

		console.log(response);

		if (response.status === "success") {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Edit Successful",
				life: 3000,
			});

			buildingData.value = {
				Building_Name: null,
				Descriptions: null,
				Address: null,
				Caretaker_Name: null,
				Caretaker_Phone: null,
			};

			emits("onSubmit", true);
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
