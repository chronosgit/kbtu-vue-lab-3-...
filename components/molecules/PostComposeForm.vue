<script setup lang="ts">
	import SquareTextInput from '../atoms/SquareTextInput.vue';

	const { postDescr, topic, onFormSubmit } = usePostComposeForm();
</script>

<template>
	<form class="flex max-w-sm flex-col gap-4" @submit.prevent="onFormSubmit()">
		<select
			v-model="topic"
			required
			class="bg-[#45d2ff] p-2 text-lg font-bold text-white"
		>
			<option value="" disabled>Select a topic</option>
			<option value="ADVENTURE">Adventure</option>
			<option value="NATURE">Nature</option>
			<option value="FASHION">Fashion</option>
			<option value="MODERN">Modern</option>
		</select>

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
