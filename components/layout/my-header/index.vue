<script setup lang="ts">
	import DesktopHeaderVersion from './components/DesktopHeaderVersion.vue';
	import MobileHeaderVersion from './components/MobileHeaderVersion.vue';

	const { isMobile } = useWindowSize();
</script>

<template>
	<MobileHeaderVersion v-if="isMobile" />

	<DesktopHeaderVersion v-else />
</template>
