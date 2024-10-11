<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			color?: string;
			size?: string;
		}>(),
		{ color: 'bg-red', size: 'h-1 w-1' }
	);
</script>

<template>
	<div class="flex flex-row gap-2">
		<div
			:class="['animate-bounce rounded-full', props.size, props.color]"
		></div>

		<div
			:class="[
				'animate-bounce rounded-full [animation-delay:-.3s]',
				props.size,
				props.color,
			]"
		></div>

		<div
			:class="[
				'animate-bounce rounded-full [animation-delay:-.5s]',
				props.size,
				props.color,
			]"
		></div>
	</div>
</template>
