import crypto from 'crypto';

export default function (length = 10) {
	const randomBytes = crypto.randomBytes(20);
	const token = randomBytes.toString('base64').slice(0, length);

	return token;
}
