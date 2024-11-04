import type IRegistrationForm from '~/interfaces/IRegistrationForm';
import AuthService from '~/services/AuthService';

export default function () {
	const form = ref<IRegistrationForm>({
		email: '',
		username: '',
		password: '',
		rePassword: '',
	});

	const isRegistrationReqLoading = ref(false);
	const error = ref('');

	const { execute: registerUser } = useLazyAsyncData(
		'registration',
		() =>
			AuthService.register(
				form.value.email,
				form.value.username,
				form.value.password
			)
				.then(async () => await navigateTo('/auth/confirmation'))
				.catch((err) => (error.value = err.statusMessage))
				.finally(() => (isRegistrationReqLoading.value = false)),
		{ immediate: false }
	);

	const validateForm = () => {
		if (form.value.password !== form.value.rePassword) {
			error.value = "Passwords don't match";

			return false;
		}

		return true;
	};

	const onFormSubmit = () => {
		if (!validateForm()) return;

		isRegistrationReqLoading.value = true;

		registerUser();
	};

	const onFormValueChange = (event: Event) => {
		const { value, id } = event.target as HTMLInputElement;

		switch (id) {
			case 'username':
				form.value.username = value;
				break;
			case 'email':
				form.value.email = value;
				break;
			case 'password':
				form.value.password = value;
				break;
			case 're-password':
				form.value.rePassword = value;
				break;
			default:
				throw createError({
					statusCode: 400,
					statusMessage: 'Invalid registration form input',
				});
		}
	};

	return {
		form,
		error,
		isRegistrationReqLoading,
		onFormValueChange,
		onFormSubmit,
		validateForm,
		registerUser,
	};
}
