import User from '~/server/models/User';

const createUser = async (username: string) => {
	const user = new User({
		username: username,
		email: username + '@gmail.com',
		password: await getHashedPassword('123'),
		isEmailConfirmed: true,
		lastLoggedIn: new Date(),
	});

	await user.save();
};

export default function () {
	try {
		createUser('aang');
		createUser('foo');
		createUser('bar');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
}
