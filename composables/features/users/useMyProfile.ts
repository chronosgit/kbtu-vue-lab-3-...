import UsersService from '~/services/UsersService';
import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const username = ref('Unknown');
	const rating = ref(0);
	const inputAge = ref('Unknown');
	const inputLocation = ref('Unknown');

	const feedback = ref('');
	const error = ref('');
	const isLoading = ref(false);

	useLazyAsyncData(
		'getMyProfile',
		async () => {
			try {
				const res = await UsersService.getMe();
				const { user } = res.data as { user: IMyUser };

				username.value = user.username;
				rating.value = user.rating;
				inputAge.value = user.age.toString();
				inputLocation.value = user.location;

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ server: false }
	);

	const { execute: fetchUpdate } = useLazyAsyncData(
		'updateMyProfile',
		() =>
			UsersService.updateMe(inputAge.value, inputLocation.value)
				.then(() => (feedback.value = 'Success!'))
				.catch(() => (error.value = 'Error'))
				.finally(() => (isLoading.value = false)),
		{ immediate: false }
	);

	const validate = () => {
		const isAgeInputted = inputAge.value.length > 0;
		const convertedAge = Number(inputAge.value);

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
		username,
		age: inputAge,
		location: inputLocation,
		rating,
		feedback,
		error,
		isLoading,
		updateProfile,
	};
}
