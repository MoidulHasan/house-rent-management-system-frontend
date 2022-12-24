<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
		>
			<div class="confirmation-content">
				<i
					class="pi pi-exclamation-triangle mr-3"
					style="font-size: 2rem"
				/>
				<span v-if="apartmentId">
					Are you sure you want to delete this Apartment?
				</span>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					class="p-button-text"
					@click="onCanceled"
				/>

				<Button
					label="Yes"
					icon="pi pi-check"
					class="p-button-text"
					@click="deleteApartment"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Appartment from "~/services/Appartment.Service";

	// define props
	const props = defineProps<{
		showDialog: boolean;
		apartmentId: string;
	}>();

	// define events
	const emits = defineEmits<{
		(e: "onDeleted", status: boolean): void;
		(e: "onHide"): void;
	}>();

	// define methods
	const onCanceled = () => {
		emits("onHide");
	};

	const deleteApartment = async () => {
		const response = await Appartment.Delete(props.apartmentId);

		response.status === "success"
			? emits("onDeleted", true)
			: emits("onDeleted", false);
	};
</script>

<style scoped></style>
