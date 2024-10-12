export default defineEventHandler((e) => {
	try {
		deleteCookie(e, 'access_token');
		deleteCookie(e, 'refresh_token');

		return getSuccessResponse(200, 'User logoutted');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
