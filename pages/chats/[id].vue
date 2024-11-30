<script setup lang="ts">
	import MyHeader from '~/components/layout/MyHeader.vue';
	import ChatMessage from '~/components/features/chats/message/index.vue';
	import ChatsService from '~/services/ChatsService';

	definePageMeta({ title: 'Chat', middleware: '4-protect-route' });

	const {
		params: { id: chatId },
	} = useRoute();

	const { chat, isLoading, refetchChat } = useChat(chatId as string);

	const msg = defineModel<string>();

	const sendMessage = async () => {
		if (!msg.value) return;

		await ChatsService.sendMessage(chatId as string, msg.value.trim());

		msg.value = '';
		refetchChat();
	};
</script>

<template>
	<div
		class="min-h-screen overflow-hidden bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3] pb-36"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<div
			v-if="Array.isArray(chat?.messages) && chat.messages.length"
			class="grid gap-10 px-2"
		>
			<ChatMessage v-for="m in chat.messages" :message="m" />
		</div>

		<p v-else class="px-2 text-2xl font-bold">No messages</p>

		<form
			class="fixed bottom-0 left-1/2 z-10 flex h-16 w-4/5 -translate-x-1/2 items-stretch overflow-hidden rounded-t-lg"
			@submit.prevent="sendMessage"
		>
			<input
				v-model="msg"
				type="text"
				placeholder="Your message here"
				required
				class="basis-3/4 px-2 py-4 text-lg font-bold text-black outline-none"
			/>

			<button class="h-full basis-1/4 bg-zinc-300">Send</button>
		</form>
	</div>
</template>
