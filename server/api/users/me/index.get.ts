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

		const userToReturn = {
			id: user._id,
			username: user.username,
			email: user.email,
			age: user.age,
			location: user.location,
			lastLoggedIn: user.lastLoggedIn,
			rating: user.rating,
			likes: user.likes,
		};
		return getSuccessResponse(200, 'User updated', { user: userToReturn });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
