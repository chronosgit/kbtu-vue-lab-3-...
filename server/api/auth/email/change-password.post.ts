import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email } = await readBody(e);

		const userWithEmail = await User.findOne({ email });
		if (!userWithEmail) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		return getSuccessResponse(200, 'Letter sent', { code: '123' });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
