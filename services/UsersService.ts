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

	static getMyFollowings() {
		return $fetch('/api/users/me/followings');
	}
}

export default UsersService;
