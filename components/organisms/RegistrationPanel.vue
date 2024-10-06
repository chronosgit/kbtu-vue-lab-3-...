<script setup lang="ts">
	import type IRegistrationFormItem from '~/interfaces/IRegistrationFormItem';

	const props = defineProps<{
		form: IRegistrationFormItem[];
	}>();

	const emit = defineEmits<{
		formValueChange: [e: Event];
		formSubmit: [];
	}>();
</script>

<template>
	<div class="mx-auto my-0 w-full max-w-[80%] lg:max-w-[50%]">
		<div class="mb-16 max-w-max rounded-lg bg-[#62e3eb] px-2 py-3">
			<p class="font-tnr text-xl font-semibold uppercase text-white">
				Profile | Registration
			</p>
		</div>

		<form
			class="flex items-end justify-between gap-4"
			@submit.prevent="emit('formSubmit')"
		>
			<div class="flex flex-col gap-2">
				<div v-for="i in props.form" class="flex flex-col gap-1 text-xl">
					<label :for="i.id" class="font-tnr font-semibold text-white">
						{{ i.label }}
					</label>

					<input
						:type="i.inputType"
						:id="i.id"
						:value="i.value"
						required
						:placeholder="i.placeholder"
						class="w-screen max-w-48 rounded-xl bg-[#74f0f0] p-2 font-tnr font-semibold text-white placeholder-white sm:max-w-96"
						@change="(e) => emit('formValueChange', e)"
					/>
				</div>
			</div>

			<button
				class="max-w-max whitespace-nowrap rounded-lg bg-[#49f364] p-3 font-tnr font-semibold uppercase text-white sm:text-xl"
			>
				Create user
			</button>
		</form>
	</div>
</template>
