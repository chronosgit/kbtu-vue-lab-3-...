class UsersService {
	static async getMe() {
		return $fetch('/api/users/me');
	}
}

export default UsersService;
