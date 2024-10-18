import User from '~/server/models/User';

const createUser = async (username: string) => {
	const user = new User({
		username: username,
		email: username + '@gmail.com',
		password: '123',
		isEmailConfirmed: true,
		lastLoggedIn: new Date(),
	});

	await user.save();
};

export default function () {
	try {
		createUser('john');
		createUser('daniel');
		createUser('aang');
		createUser('maxim');
		createUser('vasiliy');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
}
