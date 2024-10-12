import type IUser from '~/interfaces/IUser';

export default function () {
	const isAuthenticated = useState<boolean | null>(
		'isAuthenticated',
		() => null
	);
	const user = useState<IUser | null>('user', () => ({
		id: null,
		username: null,
		email: null,
		lastLoggedIn: null,
		likes: null,
		isEmailConfirmed: null,
	}));

	const loginUser = (loggedUser: IUser) => {
		isAuthenticated.value = true;
		user.value = { ...loggedUser };
	};

	const removeTokens = () => {
		const accessToken = useCookie('access_token');
		const refreshToken = useCookie('refresh_token');

		accessToken.value = null;
		refreshToken.value = null;
	};

	const logoutUser = async () => {
		isAuthenticated.value = false;
		user.value = {
			id: null,
			username: null,
			email: null,
			lastLoggedIn: null,
			likes: null,
			isEmailConfirmed: null,
		};

		removeTokens();

		await navigateTo('/');
	};

	return { isAuthenticated, user, loginUser, logoutUser };
}
