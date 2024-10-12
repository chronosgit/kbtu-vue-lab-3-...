import jwt from 'jsonwebtoken';
import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

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

		const user = await User.findOne(
			{ email },
			{
				_id: true,
				username: true,
				email: true,
				age: true,
				location: true,
				likes: true,
				rating: true,
				lastLoggedIn: true,
				isEmailConfirmed: true,
			}
		);

		return getSuccessResponse(200, 'Authenticated', { user });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
