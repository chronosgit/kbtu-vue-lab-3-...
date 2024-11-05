import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';
import createStatActivity from '~/server/utils/createStatActivity';

export default defineEventHandler(async (e) => {
	try {
		const { id: myId } = e.context.decodedToken as IAccessToken;
		if (!e.context.decodedToken) throw createError({ statusCode: 401 });

		const userId = getRouterParam(e, 'id');

		const me = await User.findByIdAndUpdate(
			myId,
			{ $pull: { followings: { userId } } },
			{ new: true }
		);

		if (!me) {
			throw createError({
				statusCode: 400,
				statusMessage: "Me doesn't exist",
			});
		}

		createStatActivity(me._id.toString());

		return getSuccessResponse(200, 'Unfollowed user', true);
	} catch (err) {
		console.error(err);
		throw createError(getErrorOptions(err));
	}
});
