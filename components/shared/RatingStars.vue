<script setup lang="ts">
	import IconStarPartial from '~/components/ui/IconStarPartial.vue';
	import { IconStarOutline, IconStarSolid } from '~/components/ui/icons';

	const props = defineProps<{ rating: number }>();

	const rating = computed(() => Math.min(Math.max(props.rating, 0), 5));

	const solids = computed(() => Math.floor(rating.value));

	const empties = computed(() => {
		if (solids.value === 5) return 0;
		if (solids.value % 1 === 0) return 4 - solids.value;

		return Math.floor(5 - rating.value);
	});

	const percent = computed(() => Math.round((rating.value % 1) * 100));

	const isPartialStarVisible = computed(() => solids.value !== 5);
</script>

<template>
	<div class="flex items-center gap-3">
		<div v-for="_ in solids" class="scale-150 text-yellow-400 md:scale-100">
			<IconStarSolid />
		</div>

		<div
			v-if="isPartialStarVisible"
			class="h-5 w-5 -translate-y-[1px] text-yellow-400"
		>
			<IconStarPartial :percent="percent" />
		</div>

		<div v-for="_ in empties" class="scale-150 text-yellow-400 md:scale-100">
			<IconStarOutline />
		</div>
	</div>
</template>
