import Post from '~/server/models/Post';
import User from '~/server/models/User';

const createPostsForUserWithEmail = async (email: string, topics: string[]) => {
	const user = await User.findOne({ email });

	if (!user) {
		console.error(`User with email: ${email} doesn't exist`);
		return;
	}

	const descriptions = [
		'1_LoremIpsumDescription',
		'2_LoremIpsumDescription',
		'3_LoremIpsumDescription',
	];

	const postPromises = topics.flatMap((topic) =>
		descriptions.map((description) => {
			const likes = Math.floor(Math.random() * 15);
			const rating = Math.min(likes / 4, 5);

			const post = new Post({
				authorId: user.id,
				authorUsername: user.username,
				topic,
				likes,
				rating,
				description,
			});

			return post.save();
		})
	);

	await Promise.all(postPromises);
};

const calculateRatings = async (email: string) => {
	const user = await User.findOne({ email });

	if (!user) {
		console.error('calculateRatingsUser');
		return;
	}

	const userPosts = await Post.find({ authorId: user?._id });

	const allUserPostsRating = userPosts.reduce((acc, p) => {
		return acc + p.rating;
	}, 0);

	user.rating = Math.min(allUserPostsRating / userPosts.length, 5);

	await user.save();
};

export default defineEventHandler(async () => {
	try {
		const migratedUsers = ['foo', 'bar', 'aang'];
		const topics = ['ADVENTURE', 'NATURE', 'FASHION', 'MODERN'];

		await Promise.all(
			migratedUsers.map((u) =>
				createPostsForUserWithEmail(u + '@gmail.com', topics)
			)
		);

		await Promise.all(
			migratedUsers.map((u) => calculateRatings(`${u}@gmail.com`))
		);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
