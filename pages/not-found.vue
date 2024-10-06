<template>
	<div
		class="px-2 w-screen h-screen bg-[url(~/assets/images/bg-trees.png)] bg-cover bg-center flex justify-center items-center"
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
