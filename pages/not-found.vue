<script setup lang="ts">
	definePageMeta({
		title: 'Page not found',
	});
</script>

<template>
	<div
		class="flex items-center justify-center w-screen h-screen px-2 bg-center bg-cover bg-trees"
	>
		<div class="p-8 text-center bg-white rounded-lg shadow-lg font-poppins">
			<h1 class="text-3xl text-error-solid">Page not found</h1>

			<p class="my-4 text-lg">Sorry, that page doesn't exist.</p>

			<NuxtLink to="/" class="mt-6 text-blue-500 cursor-pointer">
				Go to root
			</NuxtLink>
		</div>
	</div>
</template>
