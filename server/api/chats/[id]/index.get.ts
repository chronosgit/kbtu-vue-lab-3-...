import IAccessToken from '~/interfaces/IAccessToken';
import Chat from '~/server/models/Chat';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const chatId = getRouterParam(e, 'id');

		const chat = await Chat.findById(chatId);

		if (!chat) throw createError({ statusCode: 404 });

		return getSuccessResponse(200, 'Chat received', chat);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
