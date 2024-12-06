<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/layout/my-header/index.vue';
</script>

<template>
	<Default>
		<MyHeader />

		<slot></slot>
	</Default>
</template>
