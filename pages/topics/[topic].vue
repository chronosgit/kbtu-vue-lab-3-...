<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';

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
	<div class="w-screen h-screen bg-center bg-cover bg-trees">
		<div class="pt-2">
			<MyHeader />
		</div>
	</div>
</template>
