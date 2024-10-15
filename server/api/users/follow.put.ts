import mongoose, { isValidObjectId } from 'mongoose';
import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;

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

		const me = await User.findOne({
			_id: decoded.id,
		});

		if (!me) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const isAlreadyFollowed = me.followings.findIndex(
			(f) => f.toString() === userId
		);

		if (isAlreadyFollowed !== -1) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Already followed',
			});
		}

		await User.findOneAndUpdate(
			{ email: decoded.email },
			{
				$push: { followings: new mongoose.Types.ObjectId(userId) },
			}
		);

		return getSuccessResponse(200, 'User followed');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
