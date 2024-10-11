import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export default function (id: ObjectId, email: string, username: string) {
	const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = useRuntimeConfig();

	const accessToken = jwt.sign({ id, email, username }, ACCESS_TOKEN_SECRET, {
		expiresIn: '1h',
	});
	const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	});

	return { accessToken, refreshToken };
}
