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

	const logoutUser = () => {
		isAuthenticated.value = false;
		user.value = {
			id: null,
			username: null,
			email: null,
			lastLoggedIn: null,
			likes: null,
			isEmailConfirmed: null,
		};
	};

	return { isAuthenticated, user, loginUser, logoutUser };
}
