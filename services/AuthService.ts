class AuthService {
	static async register(email: string, username: string, password: string) {
		// Client-side validation is must-have

		if (!validateEmail(email) || !username || !password) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid registration parameters',
			});
		}

		return $fetch('/api/auth/register', {
			method: 'POST',
			body: { email, username, password },
		});
	}
}

export default AuthService;
