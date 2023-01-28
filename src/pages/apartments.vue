<template>
	<div>
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
			<!-- <div
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
		</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
	import AppartmentService from "../services/Appartment.Service";
	import { useAuthStore } from "../stores/auth.store";

	definePageMeta({
		title: "Apartments",
		middleware: ["auth"],
		layout: "userpanel",
	});

	const authStore = useAuthStore();

	const userId = ref(authStore.user._id);
	const apartments = ref(null);

	const fetchApartments = async () => {
		const response = await AppartmentService.fetchAll();

		apartments.value = response.data.data.filter(
			(apartment) => apartment?.renter?.User?._id === userId.value
		);
	};

	onMounted(async () => {
		await fetchApartments();
	});
</script>

<style scoped></style>
