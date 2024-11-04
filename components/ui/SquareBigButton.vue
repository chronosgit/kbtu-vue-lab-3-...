<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'click'): void;
	}>();
</script>

<template>
	<button
		class="text-outline bg-[#6bebfc] px-4 py-1 text-3xl font-bold text-white drop-shadow-md"
		@click="emit('click')"
	>
		<slot></slot>
	</button>
</template>
