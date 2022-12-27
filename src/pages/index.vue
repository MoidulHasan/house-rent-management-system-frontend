<template>
	<div>
		<PageBreadcrumb :bread-crumb-item="breadCrumbItems" :start="true" />
	</div>
</template>

<script setup>
	import Appartment from "~/services/Appartment.Service";
	import Renter from "~/services/Renter.Service";

	import { useStore } from "~~/src/stores/store";

	// define page meta
	definePageMeta({
		title: "Appartments",
		middleware: ["auth"],
	});

	// hooks
	const store = useStore();

	// states
	const breadCrumbItems = {
		label: "Home",
		url: "/",
		item: {
			label: "Dashboard",
			url: "/Dashboard",
		},
	};
</script>

<style lang="scss" scoped></style>
