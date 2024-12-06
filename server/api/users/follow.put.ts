import { isValidObjectId } from 'mongoose';
import User from '~/server/models/User';
import createStatActivity from '~/server/utils/createStatActivity';
import Friendship from '~/server/models/Friendship';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;
		const { userId: targetId } = await readBody(e);

		if (!decoded) {
			throw createError({ statusCode: 401, statusMessage: 'No access token' });
		}
		if (!isValidObjectId(targetId)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid target user ID',
			});
		}

		const me = await User.findOne({
			_id: decoded.id,
		});
		if (!me) {
			throw createError({
				statusCode: 404,
				message: "User with ID from the access token doesn't exist",
			});
		}

		const newFriendship = new Friendship({
			friends: [me._id, targetId],
		});
		await newFriendship.save();

		createStatActivity(me._id.toString());

		return getSuccessResponse(200, 'User followed', newFriendship);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
