<template>
	<div>Dashboard</div>
</template>

<script setup lang="ts">
	// define page meta
	definePageMeta({
		title: "Dashboard",
		middleware: ["auth"],
		layout: "userpanel",
	});
</script>

<style scoped></style>
