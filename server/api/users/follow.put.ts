import { isValidObjectId, mongo } from 'mongoose';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken;

		if (!decoded || !decoded.email) {
			throw createError({ statusCode: 401, statusMessage: 'No access token' });
		}

		const { userId } = await readBody(e);

		if (!isValidObjectId(userId)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid user ID',
			});
		}

		const targetUser = await User.findOne({ _id: new mongo.ObjectId(userId) });
		const me = await User.findOne({ email: decoded.email });

		return getSuccessResponse(200, 'User followed', { me, targetUser });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
