<template>
	<div class="layout-footer">
		<!-- Developed by
    <span class="font-medium ml-2"> </span> -->
	</div>
</template>

<script lang="ts">
	export default {
		name: "AppFooter",
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			},
		},
		methods: {},
	};
</script>

<style scoped></style>
