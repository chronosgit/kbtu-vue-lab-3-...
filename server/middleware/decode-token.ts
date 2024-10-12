import jwt from 'jsonwebtoken';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler((e) => {
	const accessToken = getCookie(e, 'access_token');

	if (!accessToken) return;

	const { ACCESS_TOKEN_SECRET } = useRuntimeConfig();

	const decodedToken = jwt.verify(
		accessToken,
		ACCESS_TOKEN_SECRET
	) as IAccessToken;

	e.context.decodedToken = decodedToken;
});
