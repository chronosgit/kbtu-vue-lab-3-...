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

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ isEmailConfirmed: true },
			{ new: true }
		);

		if (updatedUser.emailConfirmationToken !== confirmationToken) {
			throw createError({
				statusCode: 403,
				statusMessage: 'Confirmation token is invalid',
			});
		}

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
