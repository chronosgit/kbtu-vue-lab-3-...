import mongoose, { isValidObjectId } from 'mongoose';
import Chat from '~/server/models/Chat';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const chatId = getRouterParam(e, 'id');
		if (!isValidObjectId(chatId)) throw createError({ statusCode: 400 });

		const chat = await Chat.findById(chatId);
		if (!chat) throw createError({ statusCode: 404 });

		if (!chat.userIds.includes(new mongoose.Types.ObjectId(decodedToken.id))) {
			throw createError({ statusCode: 403 });
		}

		return getSuccessResponse(200, 'Chat received', chat);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
