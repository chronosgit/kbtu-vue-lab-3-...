import User from '~/server/models/User';
import getHashedPassword from '~/server/utils/getHashedPassword';
import getTokens from '~/server/utils/getTokens';

export default defineEventHandler(async (e) => {
	try {
		const { email, username, password } = await readBody(e);

		const maybeExistingUser = await User.findOne({
			$or: [{ email: email }, { username: username }],
		});
		if (maybeExistingUser) throw createError({ statusCode: 400 });

		const hashedPassword = getHashedPassword(password);
		const emailConfirmationToken = generateToken(15);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
			emailConfirmationToken,
		});
		await newUser.save();

		const { accessToken, refreshToken } = getTokens();

		setCookie(e, 'access_token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3600, // def: 1h
			path: '/',
		});

		setCookie(e, 'refresh_token', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30, // 30 days
			path: '/',
		});

		return getSuccessResponse(201, 'Confirmation letter is sent');
	} catch (err) {
		console.error(err);
		throw createError(getErrorOptions(err));
	}
});
