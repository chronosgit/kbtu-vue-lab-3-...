import type IServerApiResponse from '~/interfaces/IServerApiResponse';

class UsersService {
	static async updateMe(age: string, location: string) {
		return $fetch('/api/users/me', { method: 'PUT', body: { age, location } });
	}

	static async getMe() {
		return $fetch('/api/users/me');
	}

	static getUser(userId: string) {
		return $fetch(`/api/users/${userId}`);
	}

	static followUser(userId: string) {
		return $fetch(`/api/users/follow`, { method: 'PUT', body: { userId } });
	}

	static unfollowUser(userId: string) {
		return $fetch(`/api/users/${userId}/unfollow`, { method: 'PUT' });
	}

	static checkIfFollowUser(userId: string) {
		return $fetch<IServerApiResponse<boolean>>(
			`/api/users/${userId}/check-follow`
		);
	}

	static getMyFollowings() {
		return $fetch('/api/users/me/followings');
	}
}

export default UsersService;
