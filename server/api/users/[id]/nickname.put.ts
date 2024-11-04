import { isValidObjectId } from 'mongoose';
import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const targetId = getRouterParam(e, 'id');
		const { nickname } = await readBody(e);

		if (!isValidObjectId(targetId)) throw createError({ statusCode: 400 });
		if (typeof nickname !== 'string' || !nickname.length) {
			throw createError({ statusCode: 400 });
		}

		const me = await User.findById(decodedToken.id);
		if (!me) throw createError({ statusCode: 404 });

		const friend = me.followings.find((f) => f.userId.toString() === targetId);
		if (!friend) throw createError({ statusCode: 404 });

		friend.nickname = nickname;
		await me.save();

		return getSuccessResponse(200, 'Updated nickname');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
