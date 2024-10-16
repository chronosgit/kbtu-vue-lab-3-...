<script setup lang="ts">
	const error = useError();

	const handleError = () => clearError({ redirect: '/' });
</script>

<template>
	<NuxtLayout>
		<div
			class="flex h-screen w-screen items-center justify-center bg-trees bg-cover bg-center px-2"
		>
			<div class="rounded-lg bg-white p-8 text-center font-poppins shadow-lg">
				<template v-if="error?.statusCode === 404">
					<h1 class="text-3xl text-error-solid">Page not found</h1>

					<p class="my-4 text-lg">Sorry, that page doesn't exist.</p>
				</template>

				<template v-else>
					<h1 class="text-3xl">Something just broke...</h1>

					<p class="text-ember-600 my-4 text-xl text-error-solid">
						<strong>{{ error?.message }}</strong>
					</p>
				</template>

				<p class="mt-6 cursor-pointer text-blue-500" @click="handleError">
					Go to root
				</p>
			</div>
		</div>
	</NuxtLayout>
</template>
