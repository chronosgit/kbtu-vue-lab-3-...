<script setup lang="ts">
	import useUserStore from '~/store/useUserStore';

	const { user } = useUserStore();
</script>

<template>{{ user }}</template>
