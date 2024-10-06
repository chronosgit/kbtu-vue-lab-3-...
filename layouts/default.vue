<script setup lang="ts">
	const { title } = useHtmlTitle();
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
