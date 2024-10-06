<script setup lang="ts">
	const error = useError();

	const handleError = () => clearError({ redirect: '/' });
</script>

<template>
	<NuxtLayout>
		<div
			class="flex items-center justify-center w-screen h-screen px-2 bg-center bg-cover bg-trees"
		>
			<div class="p-8 text-center bg-white rounded-lg shadow-lg font-poppins">
				<template v-if="error?.statusCode === 404">
					<h1 class="text-3xl text-error-solid">Page not found</h1>

					<p class="my-4 text-lg">Sorry, that page doesn't exist.</p>
				</template>

				<template v-else>
					<h1 class="text-3xl">Something just broke...</h1>

					<p class="my-4 text-xl text-ember-600 text-error-solid">
						<strong>{{ error?.message }}</strong>
					</p>
				</template>

				<p class="mt-6 text-blue-500 cursor-pointer" @click="handleError">
					Go to root
				</p>
			</div>
		</div>
	</NuxtLayout>
</template>
