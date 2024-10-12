<script setup lang="ts">
	import useUserStore from '~/store/useUserStore';

	definePageMeta({ middleware: 'auth' });
	useHead({ title: 'My profile' });

	const { user } = useUserStore();
</script>

<template>{{ user }}</template>
