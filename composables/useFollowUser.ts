import UsersService from '~/services/UsersService';

export default function (userId: string) {
	const { execute: followUser } = useAsyncData(
		'followUser',
		async () => {
			try {
				const res = await UsersService.followUser(userId);

				console.log(res);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);

	return { followUser };
}
