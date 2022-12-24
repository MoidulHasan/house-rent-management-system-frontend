<template>
	<div>
		{{ Building_Name }}
	</div>
</template>

<script setup lang="ts">
	const route = useRoute();

	const Building_Name = route.params.Building_Name;
</script>

<style scoped></style>
