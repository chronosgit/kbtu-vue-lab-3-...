import Post from '~/server/models/Post';
import User from '~/server/models/User';
import getPostTopics from '~/server/utils/getPostTopics';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken;

		if (!decoded) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No decoded received',
			});
		}

		const { description, topic } = await readBody(e);

		const me = await User.findOne({ email: decoded.email });

		if (!me) {
			throw createError({
				statusCode: 404,
				statusMessage: "Such user doesn't exist",
			});
		}

		const topics = getPostTopics();

		if (
			!topic ||
			typeof topic !== 'string' ||
			!topics.includes(topic.toUpperCase())
		) {
			throw createError({
				name: 'TopicError',
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Invalid topic',
			});
		}

		const newPost = new Post({
			authorId: me._id,
			authorUsername: me.username,
			topic,
			description,
		});
		await newPost.save();

		return getSuccessResponse(201, 'Post created', { post: newPost });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
