<script setup lang="ts">
	import {
		Chart as ChartJS,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend,
	} from 'chart.js';

	// Register Chart.js components
	ChartJS.register(
		BarController,
		BarElement,
		CategoryScale,
		LinearScale,
		Tooltip,
		Legend
	);
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtRouteAnnouncer />

			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
