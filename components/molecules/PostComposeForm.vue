<script setup lang="ts">
	import SquareTextInput from '../atoms/SquareTextInput.vue';

	const { postDescr, onFormSubmit } = usePostComposeForm();
</script>

<template>
	<form class="flex max-w-sm flex-col gap-4" @submit.prevent="onFormSubmit()">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<label
				for="description"
				class="text-outline text-lg font-bold text-blue-300"
				>Description:
			</label>
			<SquareTextInput
				v-model="postDescr"
				placeholder="What a wonderful day!"
			/>
		</div>

		<button
			class="text-outline self-end rounded-md bg-yellow-400 px-4 py-2 font-bold text-white"
		>
			Compose
		</button>
	</form>
</template>
