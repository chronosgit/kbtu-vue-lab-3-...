<script setup lang="ts">
	import LoginInput from '~/components/features/auth/LoginInput.vue';
	import LoadingSpinner from '~/components/ui/LoadingSpinner.vue';

	const { form, error, isLoading, onFormSubmit } = useLoginForm();
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
			<div
				v-if="isLoading"
				class="pointer-events-none flex justify-center p-[10px]"
			>
				<LoadingSpinner bg-color="bg-white" />
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
