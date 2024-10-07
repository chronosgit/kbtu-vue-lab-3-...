import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email, username, password } = await readBody(e);

		const res = new User({ email, username, password });

		await res.save();

		return getSuccessResponse(201, 'Confirmation letter is sent');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
