import UsersService from '~/services/UsersService';

export default function (userId: string) {
	const {
		data: userFriends,
		status,
		refresh: refetchUserFriends,
	} = useAsyncData('useUserFriends', async () => {
		try {
			const res = await UsersService.getUserFollowings(userId);
			if (!res) return null;

			console.log(res.data);

			return res.data;
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	const areLoading = computed(() => status.value === 'pending');

	return { userFriends, areLoading, refetchUserFriends };
}
