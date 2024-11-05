import ChatsService from '~/services/ChatsService';
import type IChat from '~/interfaces/features/chats/IChat';

export default function (chatId: string) {
	const {
		data: chat,
		status,
		refresh,
	} = useAsyncData<IChat | null>('useMyFollowing', async () => {
		try {
			const { data: chat } = await ChatsService.getChat(chatId);

			return chat;
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	const isLoading = computed(() => status.value === 'pending');

	return { chat, isLoading, refetchChat: refresh };
}
