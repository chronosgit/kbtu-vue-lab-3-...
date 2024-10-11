<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';

	const {
		params: { topic },
	} = useRoute() as { params: { topic?: string } };

	if (!topic) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid topic parameter.',
			fatal: true,
		});
	}

	watchEffect(() => {
		useHead({ title: capitalize(topic) + ' blog' });
	});
</script>

<template>
	<div class="h-screen w-screen bg-trees bg-cover bg-center">
		<div class="pt-2">
			<MyHeader />
		</div>
	</div>
</template>
