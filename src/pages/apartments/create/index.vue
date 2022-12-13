<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />

		<div class="card grid mt-5">
			<div class="col-3"></div>

			<div class="grid col-6">
				<div class="col-12">
					<label
						for="name"
						class="block text-900 text-xl font-medium mb-2"
					>
						Apartment Name
					</label>
					<InputText
						v-model="email"
						aria-describedby="name"
						:class="[
							'w-full mb-3',
							{ 'p-invalid': errorMessage },
						]"
						placeholder="Apartment Name"
						style="padding: 1rem"
					/>
					<small class="p-error">
						{{ errorMessage }}
					</small>
				</div>

				<div class="col-12">
					<label
						for="name"
						class="block text-900 text-xl font-medium mb-2"
					>
						Descriptions
					</label>
					<InputText
						v-model="email"
						aria-describedby="name"
						:class="[
							'w-full mb-3',
							{ 'p-invalid': errorMessage },
						]"
						placeholder="Descriptions"
						style="padding: 1rem"
					/>
					<small class="p-error">
						{{ errorMessage }}
					</small>
				</div>
			</div>
			<div class="col-3"></div>
		</div>
	</div>
</template>

<script setup>
	// define page meta
	definePageMeta({
		title: "Create Appartments",
		middleware: ["auth"],
	});

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Appartments",
			url: "/appartments",
			item: {
				label: "Create",
				url: "/create",
			},
		},
	};
</script>

<style lang="scss" scoped></style>
