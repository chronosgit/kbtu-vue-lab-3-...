import jwt from 'jsonwebtoken';
import IAccessToken from '~/interfaces/IAccessToken';

export default function (accessToken: string) {
	const { ACCESS_TOKEN_SECRET } = useRuntimeConfig();

	const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as IAccessToken;

	return decoded;
}
