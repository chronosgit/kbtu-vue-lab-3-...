import AuthService from '~/services/AuthService';

export default function () {
	const email = ref('');
	const secretPhrase = ref('');
	const error = ref('');

	const { execute: sendConfirmationLetter } = useLazyAsyncData(
		'confirm-email',
		() =>
			AuthService.sendAccountActivationLetter(email.value, secretPhrase.value)
				.then((res) => console.log(res))
				.catch((err) => (error.value = err.statusMessage)),
		{ immediate: false }
	);

	const { execute: activateAccount } = useLazyAsyncData(
		'confirm-email',
		() =>
			AuthService.activateAccount(email.value, secretPhrase.value)
				.then(async () => await navigateTo('/'))
				.catch((err) => (error.value = err.statusMessage)),
		{ immediate: false }
	);

	return {
		email,
		secretPhrase,
		error,
		sendConfirmationLetter,
		activateAccount,
	};
}
