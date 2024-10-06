<script setup lang="ts">
	const {
		params: { topic },
	} = useRoute() as { params: { topic?: string } };

	if (!topic) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid topic: Topic must be specified.',
			fatal: true,
		});
	}

	useHead({ title: `${capitalize(topic)} blog` });
</script>

<template>
	<div>
		<h1>{{ topic }}</h1>
	</div>
</template>
