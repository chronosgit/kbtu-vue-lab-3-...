import UsersService from '~/services/UsersService';
import type IUser from '~/interfaces/IUser';

export default function (userId: string) {
	const { data: user, error } = useAsyncData<IUser | null>(
		'getUser',
		async () => {
			try {
				const res = (await UsersService.getUser(userId)) as {
					data: { user: IUser };
				};
				const { user: receivedUser } = res.data;

				return receivedUser;
			} catch (err) {
				console.error(err);

				await navigateTo('/not-found');

				return null;
			}
		},
		{ server: false }
	);

	const activity = computed(() => {
		if (!user.value?.lastLoggedIn) return 'Unknown';

		return convertDateTimeToActivityString(user.value?.lastLoggedIn);
	});

	return { user, activity, error };
}
