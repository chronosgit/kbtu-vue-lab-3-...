export default defineEventHandler(async (e) => {
	try {
		const { age, location } = await readBody(e);

		return getSuccessResponse(200, 'User updated', { age, location });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
