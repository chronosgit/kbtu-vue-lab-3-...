import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;

		if (!decoded) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No access token',
			});
		}

		const my = await User.findOne({ email: decoded.email });

		if (!my) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const users = await User.find(
			{ _id: { $in: my.followings } },
			{ password: false }
		);

		const usersToReturn = users.map((u) => ({ ...u, id: u._id }));
		return getSuccessResponse(200, 'My followings received', { usersToReturn });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
