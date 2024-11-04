import UsersService from '~/services/UsersService';

export default function (userId: string) {
	const error = ref('');
	const feedback = ref('');
	const isLoading = ref(false);

	const { execute } = useAsyncData(
		'followUser',
		async () => {
			try {
				const res = await UsersService.followUser(userId);

				feedback.value = 'Success!';

				return res;
			} catch (err) {
				console.error(err);

				error.value = 'Error during follow';

				return null;
			} finally {
				isLoading.value = false;
			}
		},
		{ immediate: false }
	);

	const followUser = async () => {
		isLoading.value = true;
		error.value = '';
		feedback.value = '';

		await execute();
	};

	return { feedback, isLoading, error, followUser };
}
