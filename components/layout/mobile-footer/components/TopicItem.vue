<script setup lang="ts">
	const props = defineProps<{ icon: object; topicUri: string }>();
</script>

<template>
	<div
		class="flex aspect-square cursor-pointer flex-col items-center justify-between gap-1 rounded-lg bg-[#b0d17c] p-3"
		@click="navigateTo(props.topicUri)"
	>
		<component :is="props.icon" class="h-10 w-10" />

		<slot></slot>
	</div>
</template>
