<script lang="ts" setup></script>

<template>
	<div class="layout-empty">
		<ClientOnly>
			<ConfirmDialog />
			<Toast />
		</ClientOnly>
		<LayoutsUserpanelAppTopBar />
		<slot />
	</div>
</template>
