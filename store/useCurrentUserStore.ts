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
	}));

	const loginUser = (loggedUser: IMyUser) => {
		isAuthenticated.value = true;
		user.value = { ...loggedUser };
	};

	const updateUser = () => {};

	const removeTokens = () => $fetch('/api/auth/logout', { method: 'PUT' });

	const logoutUser = async () => {
		isAuthenticated.value = false;
		user.value = {
			id: '',
			username: '',
			email: '',
		};

		removeTokens();

		await navigateTo('/');
	};

	return { isAuthenticated, user, loginUser, updateUser, logoutUser };
}
