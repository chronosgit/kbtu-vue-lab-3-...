import UsersService from '~/services/UsersService';
import type IUser from '~/interfaces/IUser';

export default function () {
	const users = ref<IUser[]>([]);

	const { execute: fetchMyFollowings } = useAsyncData(
		'getMyFollowing',
		async () => {
			try {
				const res = await UsersService.getMyFollowings();

				const { users: myFollowings } = res.data as { users: IUser[] };

				users.value = myFollowings;

				console.log(myFollowings);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	return { users, fetchMyFollowings };
}
