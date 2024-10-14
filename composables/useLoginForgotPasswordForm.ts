import AuthService from '~/services/AuthService';

export default function () {
	const form = ref({
		email: '',
		newPassword: '',
		reNewPassword: '',
		secretPhrase: '',
	});

	const feedback = ref('');
	const error = ref('');
	const isSubmitLoading = ref(false);
	const isEmailLoading = ref(false);

	const validate = () => {
		if (form.value.newPassword !== form.value.reNewPassword) {
			error.value = "Passwords don't match";
			return false;
		}

		return true;
	};

	const resetStates = () => {
		form.value.email = '';
		form.value.newPassword = '';
		form.value.reNewPassword = '';
		form.value.secretPhrase = '';
		isSubmitLoading.value = false;
		isEmailLoading.value = false;
	};

	const { execute: sendCode } = useLazyAsyncData(
		'sendLetterToEmail',
		() =>
			AuthService.sendPasswordChangeLetter(form.value.email)
				.then((res) => {
					console.log(res);
					feedback.value = 'Letter with code is sent!';
				})
				.catch((err) => (error.value = err.message))
				.finally(() => (isEmailLoading.value = false)),
		{ immediate: false }
	);

	const { execute: changePassword } = useLazyAsyncData(
		'changePassword',
		() =>
			AuthService.changePassword(
				form.value.email,
				form.value.newPassword,
				'123'
			)
				.then((res) => {
					console.log(res);

					feedback.value = res.statusMessage ||= '';
				})
				.catch((err) => (error.value = err.message))
				.finally(() => resetStates()),
		{ immediate: false }
	);

	const onSendLetterBtnClick = () => {
		isEmailLoading.value = true;
		error.value = '';

		sendCode();
	};

	const onFormSubmit = () => {
		if (!validate()) return;

		isSubmitLoading.value = true;
		error.value = '';

		console.log(form.value);
		changePassword();
	};

	return {
		form,
		feedback,
		error,
		isSubmitLoading,
		isEmailLoading,
		onSendLetterBtnClick,
		onFormSubmit,
	};
}
