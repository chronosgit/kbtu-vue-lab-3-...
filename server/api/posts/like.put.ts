import Post from '~/server/models/Post';
import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;

		if (!decoded) {
			throw createError({
				name: 'TokenError',
				statusCode: 401,
				statusMessage: 'Unauthorized',
				message: 'No token received',
			});
		}

		const me = await User.findOne({ email: decoded.email });

		if (!me) {
			throw createError({
				name: 'NotFoundError',
				statusCode: 404,
				statusMessage: 'Not found',
				message: "User doesn't exist",
			});
		}

		const { postId } = await readBody(e);

		if (!postId) {
			throw createError({
				name: 'BodyError',
				statusCode: 400,
				statusMessage: 'Bad request',
				message: "Body doesn't contain valid post ID",
			});
		}

		const isPostAlreadyLiked = me.likedPosts.findIndex((p) => {
			return p.toString() === postId;
		});

		if (isPostAlreadyLiked !== -1) {
			throw createError({
				name: 'LogicError',
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Post is already liked',
			});
		}

		const post = await Post.findById(postId);

		if (!post) {
			throw createError({
				name: 'NotFoundError',
				statusCode: 404,
				statusMessage: 'Not found',
				message: "Post isn't found",
			});
		}

		if (post.authorId.toString() === me._id.toString()) {
			throw createError({
				name: 'LogicError',
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'User cannot like their own like',
			});
		}

		post.rating = Math.min(post.likes + 1 / 4, 5);
		post.likes++;
		await post.save();

		const usersPost = await Post.find({ authorUsername: me.username });
		me.rating = usersPost.reduce((acc, cur) => acc + cur.rating, 0);
		me.likedPosts.push(post._id);

		await me.save();

		return getSuccessResponse(200, 'Post liked', { postRating: post.rating });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
