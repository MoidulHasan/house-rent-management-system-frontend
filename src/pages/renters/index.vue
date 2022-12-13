<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />
		<Toolbar
			:title="'Renters'"
			:add-button-label="'Add Renters'"
			:create-page-url="'/renters/create'"
		/>
	</div>
</template>

<script setup lang="ts">
	// define page meta
	definePageMeta({
		title: "Renters",
		middleware: ["auth"],
	});

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Renters",
			url: "/renters",
		},
	};
</script>

<style scoped></style>
