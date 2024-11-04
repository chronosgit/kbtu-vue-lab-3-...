import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const targetId = getRouterParam(e, 'id');
		const decodedToken = e.context.decodedToken as IAccessToken;

		if (!decodedToken) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No access token',
			});
		}

		const me = await User.findById(decodedToken.id);

		if (!me) {
			throw createError({
				statusCode: 400,
				statusMessage: 'My data not found',
			});
		}

		const target = await User.findById(targetId);

		if (!target) {
			throw createError({
				statusCode: 404,
				statusMessage: `User with id: ${targetId} isn't found`,
			});
		}

		const checkRes = me.followings.includes(target._id);

		return getSuccessResponse(200, 'Performed check', checkRes);
	} catch (err) {
		console.error(err);

		return createError(getErrorOptions(err));
	}
});
