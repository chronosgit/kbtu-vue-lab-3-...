export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken;

		if (!decoded || !decoded.email) {
			throw createError({ statusCode: 401, statusMessage: 'No access token' });
		}

		const { userId } = await readBody(e);

		return getSuccessResponse(200, 'User followed', { decoded, userId });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
