import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email, username, password } = await readBody(e);

		const maybeExistingUser = await User.findOne({
			$or: [{ email: email }, { username: username }],
		});
		if (maybeExistingUser) {
			throw createError({
				statusCode: 400,
				statusMessage: 'User already exists or credentials are invalid',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const emailConfirmationToken = generateToken(15);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
			emailConfirmationToken,
		});
		await newUser.save();

		const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = useRuntimeConfig();

		const accessToken = jwt.sign(
			{ id: newUser._id, email: newUser.email, username: newUser.username },
			ACCESS_TOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		);
		const refreshToken = jwt.sign({ id: newUser._id }, REFRESH_TOKEN_SECRET, {
			expiresIn: '30d',
		});

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
