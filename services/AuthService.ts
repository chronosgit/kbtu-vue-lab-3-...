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

	static async sendEmailConfirmationLetter() {
		return $fetch('/api/auth/confirm-email');
	}

	static async activateAccount(emailConfirmationToken: string) {
		return $fetch('/api/auth/activate', {
			method: 'POST',
			body: { emailConfirmationToken },
		});
	}
}

export default AuthService;
