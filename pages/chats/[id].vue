<script setup lang="ts">
	import MyHeader from '~/components/layout/MyHeader.vue';

	const {
		params: { id: chatId },
	} = useRoute();

	useHead({ title: 'Chat' });

	const { chat, isLoading } = useChat(chatId as string);
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<p>{{ chat }}</p>
	</div>
</template>
