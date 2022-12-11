<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />
	</div>
</template>

<script setup>
	// define page meta
	definePageMeta({
		title: "Appartments",
		middleware: ["auth"],
	});

	// define states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Appartments",
			url: "/appartments",
		},
	};
</script>

<style lang="scss" scoped></style>
