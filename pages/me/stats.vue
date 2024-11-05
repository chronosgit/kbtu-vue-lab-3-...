<script setup lang="ts">
	import StatsChart from '~/components/features/stats/StatsChart.vue';
	import MyHeader from '~/components/layout/MyHeader.vue';
	import { IconArrowLeft } from '~/components/ui/icons';

	definePageMeta({ middleware: '4-protect-route' });

	const { stats, areLoading } = useMyStats();
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="pt-2">
			<MyHeader />
		</div>

		<main class="px-8">
			<div class="flex items-center justify-between gap-6 px-6">
				<button @click="useRouter().back()">
					<IconArrowLeft class="scale-[300%] rounded-full bg-white" />
				</button>

				<p class="font-tnr text-5xl font-bold text-white">My stats</p>
			</div>

			<div v-if="stats" class="mt-8 bg-zinc-50 bg-opacity-50 px-2">
				<StatsChart :stats="stats" />
			</div>

			<p v-else class="px-2 text-2xl font-bold text-black">No stats</p>
		</main>
	</div>
</template>
