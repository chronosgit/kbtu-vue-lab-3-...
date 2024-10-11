import jwt from 'jsonwebtoken';

export default function (id: string, email: string, username: string) {
	const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = useRuntimeConfig();

	const accessToken = jwt.sign({ id, email, username }, ACCESS_TOKEN_SECRET, {
		expiresIn: '1h',
	});
	const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	});

	return { accessToken, refreshToken };
}
