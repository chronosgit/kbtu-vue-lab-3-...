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

		if (!targetUser) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Cannot follow an non-existing user',
			});
		}

		if (!me) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		await User.findByIdAndUpdate(me._id, {
			$push: { following: targetUser._id },
		});

		return getSuccessResponse(200, 'User followed');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
