<template>
	<div class="m-5">
		<div v-if="apartments" class="grid">
			<div
				v-for="apartmentData in apartments"
				:key="apartmentData.id"
				class="col-12 md:col-4 p-2"
			>
				<ApartmentCard :apartment="apartmentData" />
			</div>
		</div>
		<div
			v-else-if="!apartments?.length && typeof apartments === 'object'"
			:class="'empty-card grid'"
		>
			<div class="col-12 flex align-items-end justify-content-center">
				<img
					width="300"
					height="300"
					:src="'/images/empty-house.png'"
					alt=""
					srcset=""
				/>
			</div>
			<div class="col-12 flex justify-content-center mt-2">
				<h1 class="text-2xl font-bold">
					No Apartment Availabale!!!
				</h1>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import RentService from "../services/Rent.Service";
	import { useStore } from "../stores/store";

	definePageMeta({
		title: "Dashboard",
		layout: "userpanel",
	});

	const store = useStore();

	const apartments = ref(null);

	const fetchApartment = async () => {
		const response = await RentService.fetchAll();

		if (response.status === "success") {
			apartments.value = response.data.data.filter(
				(apartment) => apartment.Status !== "Occupied"
			);
		} else {
			apartments.value = [];
		}
	};

	onMounted(async () => {
		store.loading = true;
		await fetchApartment();
		store.loading = false;
	});
</script>

<style scoped>
	.empty-card {
		/* min-height: 50vh; */
		padding: 32px;
		background: #fafafe;
		border-radius: 12px;
	}
</style>
