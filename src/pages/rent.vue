<template>
	<div class="m-5">
		<div class="grid">
			<ApartmentCard
				v-for="apartmentData in apartments"
				:key="apartmentData.id"
				class="col-12 md:col-4"
				:apartment="apartmentData"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import RentService from "../services/Rent.Service";

	definePageMeta({
		title: "Dashboard",
		layout: "userpanel",
	});

	const apartments = ref([]);

	const fetchApartment = async () => {
		const response = await RentService.fetchAll();

		if (response.status === "success") {
			apartments.value = response.data.data;
		} else {
			apartments.value = [];
		}
	};

	onMounted(async () => {
		await fetchApartment();
	});
</script>

<style scoped></style>
