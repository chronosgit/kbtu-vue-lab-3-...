import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';
import { isValidObjectId } from 'mongoose';
import Following from '~/server/models/Friendship';
import Friendship from '~/server/models/Friendship';

export default defineEventHandler(async (e) => {
	try {
		const targetId = getRouterParam(e, 'id');
		const decodedToken = e.context.decodedToken as IAccessToken;

		if (!decodedToken) {
			throw createError({ statusCode: 401, message: 'No access token' });
		}
		if (!isValidObjectId(decodedToken.id)) {
			throw createError({ statusCode: 400, message: 'Invalid user ID' });
		}

		const me = await User.findById(decodedToken.id);
		if (!me) {
			throw createError({
				statusCode: 404,
				statusMessage: "User with ID from access token isn't found",
			});
		}

		const target = await User.findById(targetId);
		if (!target) {
			throw createError({
				statusCode: 404,
				statusMessage: `User with id: ${targetId} isn't found`,
			});
		}

		const meAndTargetFriendship = await Friendship.findOne({
			friends: {
				$all: [me._id, target._id],
			},
		});

		return getSuccessResponse(
			200,
			'Performed check',
			meAndTargetFriendship != null
		);
	} catch (err) {
		console.error(err);

		return createError(getErrorOptions(err));
	}
});
