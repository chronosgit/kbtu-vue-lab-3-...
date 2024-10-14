export default defineEventHandler((e) => {
	const accessToken = getCookie(e, 'access_token');

	if (!accessToken) return;

	const decodedToken = verifyAccessToken(accessToken);

	e.context.decodedToken = decodedToken;
});
