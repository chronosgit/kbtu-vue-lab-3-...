import UsersService from '~/services/UsersService';
import type IMyFriend from '~/interfaces/IMyFriend';

export default function () {
	const {
		data: users,
		status,
		execute: fetchMyFollowings,
	} = useAsyncData<IMyFriend[] | null>('getMyFollowing', async () => {
		try {
			const {
				data: { users },
			} = await UsersService.getMyFollowings();

			return users;
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	const unfollowUser = async (targetId: string) => {
		try {
			if (!users.value) return;

			await UsersService.unfollowUser(targetId);

			const targetInArrId = users.value.findIndex((u) => u.id === targetId);

			users.value.splice(targetInArrId, 1);
		} catch (err) {
			console.error(err);
		}
	};

	const areLoading = computed(() => status.value === 'pending');

	return { users, areLoading, fetchMyFollowings, unfollowUser };
}
