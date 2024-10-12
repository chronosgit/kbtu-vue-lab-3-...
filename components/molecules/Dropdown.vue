<script setup lang="ts">
	const props = defineProps<{
		isOpen: Boolean;
		snapToLeft?: Boolean;
		snapToCenter?: Boolean;
		snapToRight?: Boolean;
	}>();

	const yPosTw = computed(() => {
		return props.isOpen
			? 'scale-y-1 translate-y-0'
			: 'scale-y-0 -translate-y-8';
	});

	const xPosTw = computed(() => {
		if (props.snapToLeft) return 'left-0';
		if (props.snapToCenter) return 'left-[50%] -translate-x-[50%]';
		if (props.snapToRight) return 'right-0';
		return '';
	});
</script>

<template>
	<div
		class="absolute min-w-max transition-transform"
		:class="[xPosTw, yPosTw]"
	>
		<slot />
	</div>
</template>
