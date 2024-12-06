import { isValidObjectId } from 'mongoose';
import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';
import createStatActivity from '~/server/utils/createStatActivity';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) {
			throw createError({ statusCode: 401, message: 'Invalid access token' });
		}

		const targetId = getRouterParam(e, 'id');
		const { nickname } = await readBody(e);

		if (!isValidObjectId(targetId)) throw createError({ statusCode: 400 });
		if (typeof nickname !== 'string' || !nickname.length) {
			throw createError({ statusCode: 400, message: 'Invalid nickname' });
		}

		const me = await User.findById(decodedToken.id);
		if (!me) {
			throw createError({
				statusCode: 404,
				message: "User with such access token doesn't exist",
			});
		}

		console.log(me);

		const friend = me.followings.find((f) => f.toString() === targetId);
		if (!friend) {
			throw createError({
				statusCode: 404,
				message: 'Only friends can have nicknames',
			});
		}

		console.log(friend);

		createStatActivity(me._id.toString());

		return getSuccessResponse(200, 'Updated nickname');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
