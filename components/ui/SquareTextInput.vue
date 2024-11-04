<script setup lang="ts">
	const model = defineModel<string>();

	const props = defineProps<{
		type?: string;
		placeholder: string;
	}>();
</script>

<template>
	<input
		v-model="model"
		:type="props.type || 'text'"
		:placeholder="props.placeholder"
		class="bg-[#45d2ff] p-2 text-lg font-bold text-white placeholder-white"
		@focus="selectInputText"
	/>
</template>
