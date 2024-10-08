import jwt from 'jsonwebtoken';
import User from '~/server/models/User';

// Dummy logic
export default defineEventHandler(async (e) => {
	try {
		const accessToken = getCookie(e, 'access_token');

		if (!accessToken) {
			throw createError({ statusCode: 401 });
		}

		const { ACCESS_TOKEN_SECRET } = useRuntimeConfig();

		const { email } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

		const emailConfirmationToken = await User.findOne(
			{ email },
			{ emailConfirmationToken: 1, _id: 0 }
		);

		return getSuccessResponse(200, 'Letter sent', {
			confirmationToken: emailConfirmationToken,
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
