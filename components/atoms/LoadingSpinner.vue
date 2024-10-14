<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			bgColor?: string;
			dimensions?: string;
		}>(),
		{ bgColor: 'bg-red-400', dimensions: 'h-1 w-1' }
	);
</script>

<template>
	<div class="flex flex-row gap-2">
		<div
			:class="['animate-bounce rounded-full', props.dimensions, props.bgColor]"
		></div>

		<div
			:class="[
				'animate-bounce rounded-full [animation-delay:-.3s]',
				props.dimensions,
				props.bgColor,
			]"
		></div>

		<div
			:class="[
				'animate-bounce rounded-full [animation-delay:-.5s]',
				props.dimensions,
				props.bgColor,
			]"
		></div>
	</div>
</template>
