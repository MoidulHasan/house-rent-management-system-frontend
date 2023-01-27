<template>
	<div>this is admin dashboard</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: "userpanel",
		middleware: "auth",
	});
</script>

<style scoped></style>
