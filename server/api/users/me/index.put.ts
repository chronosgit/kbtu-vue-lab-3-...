import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const accessToken = getCookie(e, 'access_token');

		if (!accessToken) {
			throw createError({ statusCode: 400, statusMessage: 'No access token' });
		}

		const { email } = verifyAccessToken(accessToken);

		const user = await User.findOne({ email });

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const { age, location } = await readBody(e);

		user.age = age;
		user.location = location;
		await user.save();

		return getSuccessResponse(200, 'User updated');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
