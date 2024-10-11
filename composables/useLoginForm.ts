export default function () {
	const form = ref({
		username: '',
		password: '',
	});

	const isLoading = ref(false);
	const error = ref('');

	const resetStates = () => {
		form.value.username = '';
		form.value.password = '';
		isLoading.value = false;
		error.value = '';
	};

	return { form, error, isLoading, resetStates };
}
