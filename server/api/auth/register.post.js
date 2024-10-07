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

		// TODO: Encrypt password

		const res = new User({ email, username, password });

		await res.save();

		return getSuccessResponse(201, 'Confirmation letter is sent');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
