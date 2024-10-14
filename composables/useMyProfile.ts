import UsersService from '~/services/UsersService';
import useCurrentUserStore from '~/store/useCurrentUserStore';

export default function () {
	const { user } = useCurrentUserStore();

	const age = ref(user.value.age ? String(user.value.age) : '');
	const location = ref(user.value.location ? String(user.value.location) : '');

	const feedback = ref('');
	const error = ref('');
	const isLoading = ref(false);

	const { execute: fetchUpdate } = useLazyAsyncData(
		'updateMyProfile',
		() =>
			UsersService.getMe(age.value, location.value)
				.then(() => (feedback.value = 'Success!'))
				.catch(() => (error.value = 'Error'))
				.finally(() => (isLoading.value = false)),
		{ immediate: false }
	);

	const validate = () => {
		const isAgeInputted = age.value.length > 0;
		const convertedAge = Number(age.value);

		if (isAgeInputted && (Number.isNaN(convertedAge) || convertedAge <= 0)) {
			error.value = 'Invalid age';
			return false;
		}

		return true;
	};

	const updateProfile = () => {
		feedback.value = '';
		error.value = '';

		if (!validate()) return;

		isLoading.value = true;

		fetchUpdate();
	};

	return {
		username: user.value.username,
		age,
		location,
		feedback,
		error,
		isLoading,
		updateProfile,
	};
}
