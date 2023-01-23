<template>
	<div>
		<ApplicationTable
			:table-data="applicationData"
			@accept-application="acceptApplication"
			@reject-application="rejectApplication"
		/>
	</div>
</template>

<script setup lang="ts">
	import { Ref } from "vue";
	import ApplicationService from "~~/src/services/Application.Service";
	import { useStore } from "~~/src/stores/store";
	import { useToast } from "primevue/usetoast";
	import { Application } from "~~/constants/Types";

	// define page meta
	definePageMeta({
		title: "Rent Application",
		middleware: ["auth"],
	});

	// hooks
	const store = useStore();
	const toast = useToast();

	// states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Rental Application",
			url: "/applications",
		},
	};

	const applicationData: Ref<null | Application[]> = ref(null);
	const exportTable = ref(false);

	const fetchData = async () => {
		const response = await ApplicationService.fetchAll();

		if (response.status === "success") {
			applicationData.value = response.data.data;
		} else {
			toast.add({
				severity: "error",
				summary: "Failed",
				detail: response.message,
				life: 3000,
			});
		}
	};

	const acceptApplication = async (id: string) => {
		const response = await ApplicationService.Accept(id);

		store.loading = true;
		await fetchData();
		store.loading = false;
	};

	const rejectApplication = async (id: string) => {
		const response = await ApplicationService.Reject(id);

		store.loading = true;
		await fetchData();
		store.loading = false;
	};

	onMounted(async () => {
		store.loading = true;
		await fetchData();
		store.loading = false;
	});
</script>

<style scoped></style>
