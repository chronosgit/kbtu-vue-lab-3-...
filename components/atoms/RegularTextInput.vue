<script setup lang="ts">
	const model = defineModel<string>({ required: true });

	const props = defineProps<{
		type?: string;
		placeholder: string;
	}>();

	const emit = defineEmits<{
		(e: 'onEnterKey', value: string): void;
	}>();
</script>

<template>
	<input
		v-model="model"
		:type="props.type || 'text'"
		:placeholder="props.placeholder"
		class="bg-transparent text-black placeholder-black"
		@keydown.enter="emit('onEnterKey', model)"
	/>
</template>
