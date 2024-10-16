<script setup lang="ts">
	import PostsService from '~/services/PostsService';

	useHead({ title: 'Page not found' });

	const { execute } = useLazyAsyncData(
		'a',
		async () => {
			try {
				const res = await PostsService.getPosts(1, 6, '+TIME,+RATING');

				console.log(res);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);
</script>

<template>
	<div
		class="flex h-screen w-screen items-center justify-center bg-trees bg-cover bg-center px-2"
	>
		<div class="rounded-lg bg-white p-8 text-center font-poppins shadow-lg">
			<h1 class="text-3xl text-error-solid">Page not found</h1>

			<p class="my-4 text-lg">Sorry, that page doesn't exist.</p>

			<button class="cursor-pointer text-blue-300" @click="execute()">
				Fetch posts
			</button>

			<NuxtLink to="/" class="mt-6 cursor-pointer text-blue-500">
				Go to root
			</NuxtLink>
		</div>
	</div>
</template>
