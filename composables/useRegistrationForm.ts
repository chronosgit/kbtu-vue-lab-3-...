import type IRegistrationForm from '~/interfaces/IRegistrationForm';

export default function () {
	const form = ref<IRegistrationForm>({
		email: '',
		username: '',
		password: '',
		rePassword: '',
	});

	const error = ref('');

	const validateForm = () => {
		if (form.value.password !== form.value.rePassword) {
			error.value = "Passwords don't match";

			return false;
		}

		return true;
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
		onFormValueChange,
		validateForm,
	};
}
