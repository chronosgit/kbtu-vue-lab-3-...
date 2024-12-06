<script setup lang="ts">
	import PostComposeForm from '~/components/features/posts/PostComposeForm.vue';

	definePageMeta({ middleware: '4-protect-route', layout: 'main' });
</script>

<template>
	<div
		class="h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3] p-20"
	>
		<div class="px-2">
			<p class="text-outline mb-8 text-right text-2xl font-bold text-white">
				Compose
			</p>

			<div class="flex justify-center">
				<PostComposeForm />
			</div>
		</div>
	</div>
</template>
