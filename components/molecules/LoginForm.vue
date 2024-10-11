<script setup lang="ts">
	import AuthService from '~/services/AuthService';
	import LoginInput from '../atoms/LoginInput.vue';
	import LoadingSpinner from '../atoms/LoadingSpinner.vue';

	const { form, error, isLoading, resetStates } = useLoginForm();

	const { execute: login } = useLazyAsyncData(
		'login',
		() =>
			AuthService.login(form.value.username, form.value.password)
				.then(async (res) => {
					// TODO: auth state
					console.log(res);

					await navigateTo('/');
				})
				.catch((err) => (error.value = err.message))
				.finally(() => resetStates()),
		{ immediate: false }
	);

	const onFormSubmit = () => {
		isLoading.value = true;
		error.value = '';

		login();
	};
</script>

<template>
	<form @submit.prevent="onFormSubmit()">
		<div class="mb-6 space-y-4">
			<div class="flex justify-center">
				<LoginInput
					v-model="form.username"
					placeholder="Enter username"
					required
				/>
			</div>

			<div class="flex justify-center">
				<LoginInput
					v-model="form.password"
					type="password"
					placeholder="Enter password"
					required
				/>
			</div>
		</div>

		<slot name="btn-option"></slot>

		<button
			type="submit"
			class="text-outline text-md mx-auto mb-4 block w-1/2 rounded-lg bg-[#6aff67] px-4 py-2 uppercase tracking-[4px] text-white"
		>
			<div v-if="isLoading" class="flex justify-center p-[10px]">
				<LoadingSpinner color="bg-white" />
			</div>

			<p v-else>Authenticate</p>
		</button>

		<p
			v-show="error"
			class="mb-4 text-center text-lg font-bold text-error-solid"
		>
			{{ error }}
		</p>
	</form>
</template>
