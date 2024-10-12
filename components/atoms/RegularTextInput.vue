<script setup lang="ts">
	import type CustomizeableProfileInputs from '~/enums/CustomizeableProfileInputs';

	const model = defineModel<string>({ required: true });

	const props = defineProps<{
		type: CustomizeableProfileInputs;
		placeholder: string;
	}>();

	const emit = defineEmits<{
		(e: 'enterKey', inputType: CustomizeableProfileInputs, value: string): void;
	}>();
</script>

<template>
	<input
		v-model="model"
		:type="props.type || 'text'"
		:placeholder="props.placeholder"
		class="bg-transparent text-black placeholder-black"
		@keydown.enter="emit('enterKey', props.type, model)"
	/>
</template>
