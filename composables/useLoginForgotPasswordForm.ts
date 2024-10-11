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

	return {
		form,
		feedback,
		error,
		isSubmitLoading,
		isEmailLoading,
		validate,
		resetStates,
	};
}
