<template>
	<div>
		<Dialog
			:visible="showDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true"
			:closable="false"
		>
			<div class="confirmation-content">
				<i
					class="pi pi-exclamation-triangle mr-3"
					style="font-size: 2rem"
				/>
				<span v-if="apartmentId">
					Are you sure you want to reject this Application?
				</span>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					class="p-button-text"
					@click="handleCancel"
				/>
				<Button
					label="Yes"
					icon="pi pi-check"
					class="p-button-text"
					@click="handleConfirm"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
	import Apartment from "~/services/Appartment.Service";
	import { useToast } from "primevue/usetoast";
	import ApplicationService from "~~/src/services/Application.Service";

	// define hooks
	const toast = useToast();

	// define props
	const props = defineProps<{
		showDialog: boolean;
		applicationId: string | null;
	}>();

	const emits = defineEmits<{
		(e: "onHide"): void;
	}>();

	// methods
	const handleCancel = () => {
		emits("onHide");
	};

	const handleConfirm = async () => {
		const response = await Apartment.Delete(props.applicationId);
		ApplicationService.Cancel();

		if (response.status === "success") {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Apartment Delete Successful",
				life: 3000,
			});
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: "Apartment Delete Failed",
				life: 3000,
			});
		}

		emits("onHide");
	};
</script>

<style scoped></style>
