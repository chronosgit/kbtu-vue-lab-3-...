<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/layout/my-header/index.vue';
	import MobileFooter from '~/components/layout/mobile-footer/index.vue';
</script>

<template>
	<Default>
		<MyHeader />

		<slot></slot>

		<MobileFooter />
	</Default>
</template>
