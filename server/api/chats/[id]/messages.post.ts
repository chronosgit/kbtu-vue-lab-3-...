import mongoose, { isValidObjectId } from 'mongoose';
import Chat from '~/server/models/Chat';
import { IChatMessage } from '~/server/schemas/ChatSchema';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const chatId = getRouterParam(e, 'id');
		if (!isValidObjectId(chatId)) throw createError({ statusCode: 400 });

		const { content } = await readBody<{ content: string }>(e);
		if (typeof content !== 'string' || !content.length) {
			throw createError({ statusCode: 404 });
		}

		const chat = await Chat.findById(chatId);
		if (!chat) throw createError({ statusCode: 404 });

		const newMessage = <IChatMessage>{
			authorId: new mongoose.Types.ObjectId(decodedToken.id),
			timestamp: new Date(),
			content,
		};
		chat.messages.push(newMessage);

		await chat.save();

		return getSuccessResponse(201, 'Message created');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
