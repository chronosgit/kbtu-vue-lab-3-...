import type ILoginResponse from '~/interfaces/ILoginResponse';
import type IUser from '~/interfaces/IUser';

export default function () {
	const isAuthenticated = useState<boolean | null>(
		'isAuthenticated',
		() => null
	);
	const user = useState<IUser>('user', () => ({}));

	const loginUser = (loggedUser: ILoginResponse) => {
		isAuthenticated.value = true;
		user.value = { ...loggedUser };
	};

	const updateUser = () => {};

	const removeTokens = () => $fetch('/api/auth/logout', { method: 'PUT' });

	const logoutUser = async () => {
		isAuthenticated.value = false;
		user.value = {};

		removeTokens();

		await navigateTo('/');
	};

	return { isAuthenticated, user, loginUser, updateUser, logoutUser };
}
