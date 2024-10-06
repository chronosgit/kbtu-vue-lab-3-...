<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import RegistrationConfirmationPanel from '~/components/organisms/RegistrationConfirmationPanel.vue';
	import RegistrationPanel from '~/components/organisms/RegistrationPanel.vue';

	useHead({ title: 'Registration' });

	const { form, isConfirmationPanelActive, onFormValueChange, toConfirmPanel } =
		useRegistrationForm();
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
				@form-value-change="onFormValueChange"
				@form-submit="toConfirmPanel"
			/>

			<RegistrationConfirmationPanel v-else />
		</div>
	</div>
</template>
