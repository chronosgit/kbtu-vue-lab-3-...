<script setup lang="ts">
	import StarSolid from '~/components/atoms/StarSolid.vue';
	import StarOutline from '~/components/atoms/StarOutline.vue';
	import StarPartial from '~/components/atoms/StarPartial.vue';

	const props = defineProps<{ rating: number }>();

	if (props.rating < 0 || props.rating > 5) {
		throw createError({ statusMessage: 'Invalid rating' });
	}

	const solids = computed(() => Math.floor(props.rating));
	const empties = computed(() => {
		if (solids.value === 5) return 0;
		if (solids.value % 1 === 0) return 4 - solids.value;

		return Math.floor(5 - props.rating);
	});
	const percent = computed(() => Math.round((props.rating % 1) * 100));

	const isPartialStarVisible = computed(() => solids.value !== 5);
</script>

<template>
	<div class="flex items-center gap-3">
		<div v-for="_ in solids" class="scale-150 text-yellow-400 md:scale-100">
			<StarSolid />
		</div>

		<div
			v-if="isPartialStarVisible"
			class="h-5 w-5 -translate-y-[1px] text-yellow-400"
		>
			<StarPartial :percent="percent" />
		</div>

		<div v-for="_ in empties" class="scale-150 text-yellow-400 md:scale-100">
			<StarOutline />
		</div>
	</div>
</template>
