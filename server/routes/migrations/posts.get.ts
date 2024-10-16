import Post from '~/server/models/Post';
import User from '~/server/models/User';

const createPostsForUserWithEmail = async (email: string) => {
	const user = await User.findOne({ email });

	if (!user) {
		console.error(`User with email: ${email} doesn\'t exist`);
		return;
	}

	const descriptions = [
		'Love this! 😍',
		'Amazing shot! 🔥',
		'So beautiful! ✨',
		'Incredible view! 🌄',
		'This is goals! 🙌',
		'Absolutely stunning! 😍',
		"Can't get enough of this! 😍",
		"You're killing it! 💯",
		'Wow, just wow! 😮',
		'Pure perfection! 😍',
	];

	const postPromises = descriptions.map(async (description) => {
		const post = new Post({
			authorId: user.id,
			rating: Math.random() * 5,
			description: description,
		});

		return await post.save();
	});

	// Await all post promises
	await Promise.all(postPromises);
};

export default defineEventHandler(async () => {
	try {
		const migratedUsers = ['john', 'vanya', 'gojo', 'bumi', 'aang'];

		await Promise.all(
			migratedUsers.map((u) => createPostsForUserWithEmail(u + '@gmail.com'))
		);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
