<script setup lang="ts">
	import { IconStarOutline, IconStarSolid } from '~/components/ui/icons';

	const props = defineProps<{
		percent: number;
	}>();

	const clipStyle = computed(() => ({
		'clip-path': `inset(0 ${100 - props.percent}% 0 0)`,
	}));
</script>

<template>
	<div class="relative h-4 w-4">
		<div
			id="solid"
			class="absolute top-0 z-10 scale-150 md:scale-100"
			:style="clipStyle"
		>
			<IconStarSolid />
		</div>

		<div id="outline" class="absolute top-0 scale-150 md:scale-100">
			<IconStarOutline />
		</div>
	</div>
</template>
