import jwt from 'jsonwebtoken';
import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const accessToken = getCookie(e, 'access_token');

		if (!accessToken) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No access token',
			});
		}

		const { ACCESS_TOKEN_SECRET } = useRuntimeConfig();

		const { email } = jwt.verify(
			accessToken,
			ACCESS_TOKEN_SECRET
		) as IAccessToken;

		const user = await User.findOne({ email });

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Such user doesn\t exist',
			});
		}

		const userToReturn = {
			id: user._id,
			username: user.username,
			email: user.email,
			age: user.age,
			location: user.location,
			likes: user.likes,
			rating: user.rating,
			lastLoggedIn: user.lastLoggedIn,
			isEmailConfirmed: user.isEmailConfirmed,
		};

		return getSuccessResponse(200, 'Authenticated', { user: userToReturn });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
