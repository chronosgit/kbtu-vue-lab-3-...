<script setup lang="ts">
	import AuthService from '~/services/AuthService';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import RegistrationConfirmationPanel from '~/components/organisms/RegistrationConfirmationPanel.vue';
	import RegistrationPanel from '~/components/organisms/RegistrationPanel.vue';

	useHead({ title: 'Registration' });

	const {
		form,
		isConfirmationPanelActive,
		error,
		onFormValueChange,
		toConfirmPanel,
		validateForm,
	} = useRegistrationForm();

	const { execute: registerUser } = useLazyAsyncData(
		'registration',
		() =>
			AuthService.register(
				form.value.email,
				form.value.username,
				form.value.password
			),
		{ immediate: false }
	);

	const toConfirmationAuthStepHandler = () => {
		if (!validateForm()) return;

		// Register the user from here
		registerUser();

		// Change UI to confirmation
		toConfirmPanel();
	};
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-8">
			<MyHeader />
		</div>

		<div class="px-2">
			<RegistrationPanel
				v-if="!isConfirmationPanelActive"
				:form
				:error
				@form-value-change="onFormValueChange"
				@form-submit="toConfirmationAuthStepHandler"
			/>

			<RegistrationConfirmationPanel v-else />
		</div>
	</div>
</template>
