import type IChat from '~/interfaces/features/chats/IChat';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

class ChatsService {
	static async accessChatBlindly(partnerId: string) {
		return $fetch<IServerApiResponse<IChat>>('/api/chats/access', {
			method: 'POST',
			body: { partnerId },
		});
	}

	static async getChat(chatId: string) {
		return $fetch<IServerApiResponse<IChat>>(`/api/chats/${chatId}`);
	}

	static async sendMessage(chatId: string, content: string) {
		if (!content) return;

		return $fetch(`/api/chats/${chatId}/messages`, {
			method: 'POST',
			body: { content },
		});
	}
}

export default ChatsService;
