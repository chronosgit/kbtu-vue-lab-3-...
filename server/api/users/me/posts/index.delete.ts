import Post from '~/server/models/Post';
import createStatActivity from '~/server/utils/createStatActivity';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken;

		if (!decoded) {
			throw createError({
				name: 'TokenError',
				statusCode: 401,
				statusMessage: 'Unauthorized',
				message: 'No decoded token received',
			});
		}

		const { postId } = await readBody(e);

		await Post.findByIdAndDelete(postId);

		createStatActivity(decoded.id);

		return getSuccessResponse(204, 'Post deleted');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
