export default defineEventHandler(async (e) => {
	try {
		return getSuccessResponse(200, 'Letter sent');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
