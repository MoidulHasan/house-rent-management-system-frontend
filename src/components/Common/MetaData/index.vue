<template>
	<div class="meta-tag">
		<span class="meta-title">{{ dataKey }} : </span>
		<span v-if="value" class="meta-data ml-3"> {{ value }}</span>
		<slot />
	</div>
</template>

<script setup lang="ts">
	// props
	const props = defineProps<{
		dataKey: string;
		value?: string;
	}>();
</script>

<style lang="scss" scoped>
	.meta-tag {
		padding-top: 0px;
		padding-bottom: 0px;
	}
	.meta-title {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 500;
		font-size: 15px;

		color: #616161;
	}

	.meta-data {
		font-family: "Poppins";
		font-style: normal;
		font-weight: 500;
		font-size: 15px;

		color: #596c91;
	}
</style>
