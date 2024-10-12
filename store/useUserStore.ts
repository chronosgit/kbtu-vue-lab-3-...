import type IUser from '~/interfaces/IUser';

export default function () {
	const isAuthenticated = useState('isAuthenticated', () => false);
	const user = useState<IUser | null>('user', () => ({
		id: null,
		username: null,
		email: null,
		lastLoggedIn: null,
	}));

	const loginUser = (loggedUser: IUser) => (user.value = { ...loggedUser });

	const logoutUser = () => {
		user.value = {
			id: null,
			username: null,
			email: null,
			lastLoggedIn: null,
		};
	};

	return { isAuthenticated, user, loginUser, logoutUser };
}
