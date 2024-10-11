import bcrypt from 'bcryptjs';

export default async function (inputPassword: string, hashedPassword: string) {
	const match = await bcrypt.compare(inputPassword, hashedPassword);

	return match;
}
