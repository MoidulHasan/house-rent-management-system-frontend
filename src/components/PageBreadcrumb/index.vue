<template>
	<div class="flex align-items-center bread-crumb">
		<PageBreadcrumbBread
			:start="start"
			:bread-crumb-item="breadCrumbItem"
		/>
	</div>
</template>

<script setup>
	const props = defineProps(["start", "breadCrumbItem"]);
</script>

<style lang="scss" scoped>
	.bread-crumb {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 27px;
		display: flex;
		align-items: center;
		color: #aaaaaa;
		margin-bottom: 10px;
	}
</style>
