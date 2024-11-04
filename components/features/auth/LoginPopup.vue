<script setup lang="ts">
	import LoginForgotPasswordForm from '~/components/features/auth/LoginForgotPasswordForm.vue';
	import LoginForm from '~/components/features/auth/LoginForm.vue';

	const props = defineProps<{
		isOpen: boolean;
	}>();

	const isForgotForm = ref(false);

	const toggleForgotForm = () => (isForgotForm.value = !isForgotForm.value);
</script>

<template>
	<div
		class="absolute left-1/2 top-1/2 z-20 mx-2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gradient-to-b from-[#f8f7f7] to-[#c1bebe] pb-8"
		:class="{ block: props.isOpen, hidden: !props.isOpen }"
	>
		<div
			class="mb-20 bg-[#75c2fa] p-2 text-center font-handjet text-3xl uppercase tracking-widest text-white"
		>
			Login
		</div>

		<LoginForgotPasswordForm v-if="isForgotForm">
			<template #btn-option>
				<button
					type="button"
					class="mx-auto my-6 block bg-white px-2 py-1 font-tnr font-extrabold uppercase outline-1"
					@click.stop="toggleForgotForm()"
				>
					REMEMBER PASSWORD?
				</button>
			</template>
		</LoginForgotPasswordForm>

		<LoginForm v-else>
			<template #btn-option>
				<button
					type="button"
					class="mx-auto my-6 block bg-white px-2 py-1 font-tnr font-extrabold uppercase outline-1"
					@click.stop="toggleForgotForm()"
				>
					FORGOT PASSWORD?
				</button>
			</template>
		</LoginForm>
	</div>
</template>
