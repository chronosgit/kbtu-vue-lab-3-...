import useCurrentUserStore from '~/store/useCurrentUserStore';
import AuthService from '~/services/AuthService';
import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const form = ref({
		username: '',
		password: '',
	});

	const isLoading = ref(false);
	const error = ref('');

	const { loginUser } = useCurrentUserStore();

	const { execute: login } = useLazyAsyncData(
		'login',
		() =>
			AuthService.login(form.value.username, form.value.password)
				.then(async (res) => {
					const { user } = res.data as { user: IMyUser };
					loginUser(user);

					await navigateTo('/users/me');
				})
				.catch(() => (error.value = 'Error'))
				.finally(() => (isLoading.value = false)),
		{ immediate: false }
	);

	const onFormSubmit = () => {
		isLoading.value = true;
		error.value = '';

		login();
	};

	return { form, error, isLoading, onFormSubmit };
}
