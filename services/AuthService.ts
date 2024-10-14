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

	static async sendAccountActivationLetter(
		email: string,
		secretPhrase: string
	) {
		return $fetch('/api/auth/email/activate-account', {
			method: 'POST',
			body: { email, confirmationToken: secretPhrase },
		});
	}

	static async activateAccount(email: string, confirmationToken: string) {
		return $fetch('/api/auth/me/activate', {
			method: 'POST',
			body: { email, confirmationToken },
		});
	}

	static async login(username: string, password: string) {
		return $fetch('/api/auth/login', {
			method: 'POST',
			body: { username, password },
		});
	}

	static async validateAuthentication() {
		return $fetch('/api/auth/validate');
	}

	static async sendPasswordChangeLetter(email: string) {
		return $fetch('/api/auth/email/change-password', {
			method: 'POST',
			body: { email },
		});
	}

	static async changePassword(
		email: string,
		newPassword: string,
		code: string
	) {
		return $fetch('/api/auth/me/forgot-password', {
			method: 'PUT',
			body: { email, newPassword, code },
		});
	}
}

export default AuthService;
