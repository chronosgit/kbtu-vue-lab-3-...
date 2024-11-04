import UsersService from '~/services/UsersService';

export default function (userId: string) {
	const { data, status, execute } = useAsyncData<boolean | null>(
		'useCheckIfFollowUser',
		async () => {
			try {
				const res = await UsersService.checkIfFollowUser(userId);

				return res.data;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	const isLoading = computed(() => status.value === 'pending');

	return { data, isLoading, check: execute };
}
