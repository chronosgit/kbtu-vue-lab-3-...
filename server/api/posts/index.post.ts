import Post from '~/server/models/Post';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken;

		if (!decoded) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No decoded received',
			});
		}

		const { description } = await readBody(e);

		const me = await User.findOne({ email: decoded.email });

		if (!me) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const newPost = new Post({
			authorId: me._id,
			authorUsername: me.username,
			description,
		});
		await newPost.save();

		return getSuccessResponse(201, 'Post created', { post: newPost });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
