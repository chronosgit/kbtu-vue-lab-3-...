<script setup lang="ts">
	import { BarChart } from 'vue-chart-3';
	import type IStat from '~/interfaces/features/stats/IStat';

	const props = defineProps<{ stats: IStat }>();

	// Group by "day month"
	const groupedActivities = props.stats.activities.reduce((acc, ds) => {
		const date = new Date(ds);
		const dayMonth = `${date.getUTCDate()} ${date.toLocaleString('kz-KZ', { month: 'long' })}`;

		// @ts-ignore mendokuse
		acc[dayMonth] = (acc[dayMonth] || 0) + 1;

		return acc;
	}, {});

	const chartData = ref({
		labels: Object.keys(groupedActivities),
		datasets: [
			{
				label: 'Activities',
				backgroundColor: '#11ffe7',
				data: Object.values(groupedActivities),
			},
		],
	});

	const chartOptions = ref({
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	});
</script>

<template>
	<BarChart :chart-data="chartData" :options="chartOptions" class="" />
</template>
