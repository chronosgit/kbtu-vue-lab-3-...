import User from '~/server/models/User';
import getHashedPassword from '~/server/utils/getHashedPassword';

export default defineEventHandler(async (e) => {
	try {
		const { email, username, password } = await readBody(e);

		const maybeExistingUser = await User.findOne({
			$or: [{ email: email }, { username: username }],
		});
		if (maybeExistingUser) throw createError({ statusCode: 400 });

		const hashedPassword = await getHashedPassword(password);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		return getSuccessResponse(201, 'User is pre-registered');
	} catch (err) {
		console.error(err);
		throw createError(getErrorOptions(err));
	}
});
