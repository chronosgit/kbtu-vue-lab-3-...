import UsersService from '~/services/UsersService';
import type IUser from '~/interfaces/IUser';

export default function (userId: string) {
	const { data: user, error } = useAsyncData<IUser | null>(
		'getUser',
		async () => {
			try {
				const res = await UsersService.getUser(userId);
				const { user: receivedUser } = res.data as { user: IUser };

				return receivedUser;
			} catch (err) {
				console.error(err);

				await navigateTo('/not-found');

				return null;
			}
		}
	);

	const activity = computed(() => {
		if (!user.value?.lastLoggedIn) return 'Unknown';

		return convertDateTimeToActivityString(user.value?.lastLoggedIn);
	});

	return { user, activity, error };
}
