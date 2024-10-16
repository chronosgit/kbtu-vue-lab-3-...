import IAccessToken from '~/interfaces/IAccessToken';
import Post from '~/server/models/Post';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;

		if (!decoded) {
			throw createError({
				name: 'TokenError',
				statusCode: 401,
				statusMessage: 'Unauthorized',
				message: "Access token wasn't provided",
			});
		}

		const myPosts = await Post.find({ authorId: decoded.id }).lean();

		return getSuccessResponse(200, 'Posts received', { posts: myPosts });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
