<script setup lang="ts">
	const route = useRoute();

	const title = route.meta.title || 'Sophisticated blog';
</script>

<template>
	<div>
		<Html>
			<Head>
				<Title>{{ title }}</Title>
			</Head>

			<Body>
				<slot />
			</Body>
		</Html>
	</div>
</template>
