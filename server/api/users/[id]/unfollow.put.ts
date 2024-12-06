import { isValidObjectId } from 'mongoose';
import IAccessToken from '~/interfaces/IAccessToken';
import Friendship from '~/server/models/Friendship';
import User from '~/server/models/User';
import createStatActivity from '~/server/utils/createStatActivity';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) {
			throw createError({ statusCode: 401, message: 'No access token' });
		}

		const targetId = getRouterParam(e, 'id');
		if (!isValidObjectId(targetId)) {
			throw createError({ statusCode: 400, message: 'Invalid userId param' });
		}

		const deletedFriendship = await Friendship.deleteOne({
			friends: { $all: [targetId, decodedToken.id] },
		});
		if (deletedFriendship.deletedCount === 0) {
			throw createError({
				statusCode: 404,
				statusMessage: 'No friendship found to delete between these users',
			});
		}

		createStatActivity(decodedToken.toString());
		return getSuccessResponse(200, 'Unfollowed user', true);
	} catch (err) {
		console.error(err);
		throw createError(getErrorOptions(err));
	}
});
