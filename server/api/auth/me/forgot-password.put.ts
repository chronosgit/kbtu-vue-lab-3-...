import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email, newPassword, code } = await readBody(e);

		const userWithEmail = await User.findOne({ email });
		if (!userWithEmail) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		if (code !== '123') {
			throw createError({
				statusCode: 403,
				statusMessage: 'Invalid code',
			});
		}

		const hashedNewPassword = await getHashedPassword(newPassword);

		userWithEmail.password = hashedNewPassword;
		await userWithEmail.save();

		return getSuccessResponse(200, 'Password is updated');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
