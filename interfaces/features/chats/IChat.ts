import type IChatMessage from '~/interfaces/features/chats/IChatMessage';

export default interface IChat {
	_id: string;
	userIds: string[];
	type: 'duo' | 'group';
	messages: IChatMessage[];
	createdAt: Date;
}
