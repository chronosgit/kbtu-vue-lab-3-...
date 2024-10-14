class UsersService {
	static async getMe(age: string, location: string) {
		return $fetch('/api/users/me', { method: 'PUT', body: { age, location } });
	}
}

export default UsersService;
