import UsersService from '~/services/UsersService';
import type IUser from '~/interfaces/features/users/IUser';

export default function () {
	const {
		data: users,
		status,
		execute: fetchMyFollowings,
	} = useAsyncData<IUser[] | null>(
		'features.users.useMyFriendships',
		async () => {
			try {
				const res = await UsersService.getMyFriendships();
				if (res == null) return null;

				return res.data;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	const unfollowUser = async (targetId: string) => {
		try {
			if (users.value == null) return;

			await UsersService.unfollowUser(targetId);

			const targetInArrId = users.value.findIndex((u) => u._id === targetId);

			users.value.splice(targetInArrId, 1);
		} catch (err) {
			console.error(err);
		}
	};

	const areLoading = computed(() => status.value === 'pending');

	return { users, areLoading, fetchMyFollowings, unfollowUser };
}
