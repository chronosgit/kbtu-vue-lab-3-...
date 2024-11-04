import IAccessToken from '~/interfaces/IAccessToken';
import Chat from '~/server/models/Chat';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const { partnerId } = await readBody(e);
		const { id: myId } = decodedToken;

		const chat = await Chat.findOne({
			type: 'duo',
			userIds: { $all: [myId, partnerId] },
		});

		if (chat) return getSuccessResponse(200, 'Chat opened', chat);

		// If no chat found, then we create one
		const newChat = new Chat({
			userIds: [partnerId, myId],
			type: 'duo',
			messages: [],
			createdAt: new Date(),
		});
		await newChat.save();

		return getSuccessResponse(200, 'Chat opened', newChat);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
