import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const isAuthenticated = useState<boolean | null>(
		'isAuthenticated',
		() => null
	);

	const user = useState<IMyUser>('user', () => ({
		id: '',
		username: '',
		email: '',
		age: 0,
		location: '',
		likes: 0,
		rating: 0,
		lastLoggedIn: '',
		isEmailConfirmed: false,
	}));

	const loginUser = (loggedUser: IMyUser) => {
		isAuthenticated.value = true;
		user.value = { ...loggedUser };
	};

	const removeTokens = async () =>
		$fetch('/api/auth/logout', { method: 'PUT' });

	const logoutUser = async () => {
		isAuthenticated.value = false;
		user.value = {
			id: '',
			username: '',
			email: '',
			age: 0,
			location: '',
			likes: 0,
			rating: 0,
			lastLoggedIn: '',
			isEmailConfirmed: false,
		};

		await removeTokens();

		await navigateTo('/');
	};

	return { isAuthenticated, user, loginUser, logoutUser };
}
