import jwt from 'jsonwebtoken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const accessToken = getCookie(e, 'access_token');

		if (!accessToken) throw createError({ statusCode: 401 });

		const { ACCESS_TOKEN_SECRET } = useRuntimeConfig();

		const { email } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

		const { emailConfirmationToken } = await readBody(e);

		if (!emailConfirmationToken) throw createError({ statusCode: 400 });

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ isEmailConfirmed: true },
			{ new: true }
		);

		return getSuccessResponse(200, 'Account activated', {
			updatedUser,
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
