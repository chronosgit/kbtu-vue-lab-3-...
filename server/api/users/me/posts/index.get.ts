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

		const { page: qPage, pageSize: qPageSize } = getQuery(e);

		const page = Number(qPage);
		const pageSize = Number(qPageSize);

		if (
			Number.isNaN(page) ||
			Number.isNaN(pageSize) ||
			page < 1 ||
			pageSize < 1
		) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		const totalPosts = await Post.countDocuments({ authorId: decoded.id });

		if (totalPosts === 0) {
			const response = {
				posts: [],
				meta: {
					totalPosts: 0,
					totalPages: 0,
					currentPage: page,
					postsPerPage: pageSize,
					hasPreviousPage: false,
					hasNextPage: false,
				},
			};

			return getSuccessResponse(200, 'Posts received', response);
		}

		const myPosts = await Post.find({ authorId: decoded.id })
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.lean();

		const response = {
			posts: myPosts,
			meta: {
				totalPosts,
				totalPages: Math.ceil(totalPosts / pageSize),
				currentPage: page,
				postsPerPage: pageSize,
				hasPreviousPage: page > 1,
				hasNextPage: page < Math.ceil(totalPosts / pageSize),
			},
		};

		return getSuccessResponse(200, 'Posts received', response);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
