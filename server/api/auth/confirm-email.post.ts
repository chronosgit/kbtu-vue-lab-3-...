import User from '~/server/models/User';

// Dummy logic
export default defineEventHandler(async (e) => {
	try {
		const { email } = await readBody(e);

		const emailConfirmationToken = await User.findOne(
			{ email },
			{ emailConfirmationToken: 1, _id: 0 }
		);
		if (!emailConfirmationToken) throw createError({ statusCode: 400 });

		return getSuccessResponse(200, 'Letter sent', {
			confirmationToken: emailConfirmationToken,
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
