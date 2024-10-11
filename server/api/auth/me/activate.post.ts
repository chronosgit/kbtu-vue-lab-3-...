import { ObjectId } from 'mongoose';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email, confirmationToken } = await readBody(e);
		if (!email || !confirmationToken) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Missing parameters',
			});
		}

		const updatedUser = await User.findOne({ email });
		if (!updatedUser) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		if (confirmationToken != '123') {
			throw createError({
				statusCode: 401,
				statusMessage: 'Invalid confirmation token',
			});
		}

		updatedUser.isEmailConfirmed = true;
		await updatedUser.save();

		const { accessToken, refreshToken } = getTokens(
			updatedUser._id as ObjectId,
			updatedUser.email,
			updatedUser.username
		);

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

		return getSuccessResponse(200, 'Account activated', {
			id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
