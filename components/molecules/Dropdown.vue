<script setup lang="ts">
	const props = defineProps<{
		isOpen: Boolean;
		snapToLeft?: Boolean;
		snapToCenter?: Boolean;
		snapToRight?: Boolean;
	}>();

	const yPosTw = computed(() => {
		return props.isOpen ? 'scale-y-1' : 'scale-y-0';
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
		class="absolute z-10 min-w-max shadow-xl transition-transform"
		:class="[xPosTw, yPosTw]"
	>
		<slot />
	</div>
</template>
