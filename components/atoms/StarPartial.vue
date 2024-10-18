<script setup lang="ts">
	import StarOutline from './StarOutline.vue';
	import StarSolid from './StarSolid.vue';

	const props = defineProps<{
		percent: number;
	}>();

	const clipStyle = computed(() => ({
		'clip-path': `inset(0 ${100 - props.percent}% 0 0)`,
	}));
</script>

<template>
	<div class="relative flex items-center">
		<div
			id="solid"
			class="absolute top-0 z-10 scale-150 md:scale-100"
			:style="clipStyle"
		>
			<StarSolid />
		</div>

		<div id="outline" class="absolute top-0 scale-150 md:scale-100">
			<StarOutline />
		</div>
	</div>
</template>
