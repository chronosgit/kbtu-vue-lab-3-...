<script setup lang="ts">
	const model = defineModel({ required: true });

	const props = defineProps<{
		placeholder: string;
		type?: string;
		required?: boolean;
	}>();
</script>

<template>
	<input
		v-model="model"
		:type="props.type || 'text'"
		:placeholder="placeholder"
		:required="required"
		class="p-2 font-tnr text-lg font-bold placeholder-black placeholder:font-bold placeholder:uppercase"
	/>
</template>
