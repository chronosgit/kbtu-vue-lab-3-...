import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email } = e.context.decodedToken as IAccessToken;

		const user = await User.findOne({ email }, { password: false });

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const usersToReturn = { ...user, id: user._id };
		return getSuccessResponse(200, 'User updated', { usersToReturn });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
