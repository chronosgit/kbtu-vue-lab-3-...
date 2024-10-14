<script setup lang="ts">
	import LoginInput from '@/components/atoms/LoginInput.vue';
	import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue';

	const {
		form,
		feedback,
		error,
		isSubmitLoading,
		isEmailLoading,
		onSendLetterBtnClick,
		onFormSubmit,
	} = useLoginForgotPasswordForm();
</script>

<template>
	<form @submit.prevent="onFormSubmit">
		<div class="mb-6 flex flex-col items-center gap-4">
			<LoginInput
				v-model="form.email"
				type="email"
				placeholder="Enter email"
				required
			/>

			<LoginInput
				v-model="form.newPassword"
				type="password"
				placeholder="Enter new password"
				required
			/>

			<LoginInput
				v-model="form.reNewPassword"
				type="password"
				placeholder="Confirm password"
				required
			/>

			<LoginInput
				v-model="form.secretPhrase"
				type="password"
				placeholder="Enter code"
				required
			/>
		</div>

		<slot name="btn-option"></slot>

		<div class="grid grid-cols-2 items-center justify-center gap-4 px-4">
			<button
				type="submit"
				class="text-outline text-md mx-auto mb-4 block w-full text-clip whitespace-nowrap rounded-lg bg-[#6aff67] px-4 py-2 uppercase tracking-[4px] text-white"
			>
				<div v-if="isSubmitLoading" class="flex justify-center p-[10px]">
					<LoadingSpinner color="bg-white" />
				</div>

				<p v-else>Change</p>
			</button>

			<button
				type="button"
				class="text-outline text-md mx-auto mb-4 block w-full text-clip whitespace-nowrap rounded-lg bg-[#e7dd54] px-4 py-2 uppercase tracking-[4px] text-white"
				@click.stop="onSendLetterBtnClick()"
			>
				<div v-if="isEmailLoading" class="flex justify-center p-[10px]">
					<LoadingSpinner color="bg-white" />
				</div>

				<p v-else>Send letter</p>
			</button>
		</div>

		<p
			v-show="feedback"
			class="mb-4 text-center text-lg font-bold text-green-700"
		>
			{{ feedback }}
		</p>

		<p
			v-show="error"
			class="mb-4 text-center text-lg font-bold text-error-solid"
		>
			{{ error }}
		</p>
	</form>
</template>
