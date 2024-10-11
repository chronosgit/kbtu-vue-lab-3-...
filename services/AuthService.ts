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

	static async sendEmailConfirmationLetter(email: string) {
		return $fetch('/api/auth/confirm-email', {
			method: 'POST',
			body: { email },
		});
	}

	static async activateAccount(email: string, secretPassPhrase: string) {
		return $fetch('/api/auth/activate', {
			method: 'POST',
			body: { email, confirmationToken: secretPassPhrase },
		});
	}
}

export default AuthService;
