<script setup lang="ts">
	import PostComposeForm from '~/components/molecules/PostComposeForm.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';

	definePageMeta({ middleware: '4-protect-route' });
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-4">
			<MyHeader />
		</div>

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
