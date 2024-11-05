import type IStat from '~/interfaces/features/stats/IStat';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

class StatsService {
	static async getMyStats() {
		return $fetch<IServerApiResponse<IStat>>('/api/users/me/stats');
	}
}

export default StatsService;
