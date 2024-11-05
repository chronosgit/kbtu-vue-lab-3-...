import StatsService from '~/services/StatsService';
import type IStat from '~/interfaces/features/stats/IStat';

export default function () {
	const { data: stats, status } = useAsyncData<IStat | null>(
		'useMyStats',
		async () => {
			try {
				const res = await StatsService.getMyStats();

				return res.data;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	const areLoading = computed(() => status.value === 'pending');

	return { stats, areLoading };
}
