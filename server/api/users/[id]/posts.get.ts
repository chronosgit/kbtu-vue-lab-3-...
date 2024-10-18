import { Types } from 'mongoose';
import Post from '~/server/models/Post';

export default defineEventHandler(async (e) => {
	try {
		const { userId, page: qPage, pageSize: qPageSize } = getQuery(e);

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

		const allPosts = await Post.find({
			authorId: new Types.ObjectId(String(userId)),
		});

		const paginatedPosts = await Post.find({
			authorId: new Types.ObjectId(String(userId)),
		})
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.lean();

		if (allPosts.length === 0) {
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

		if (page > Math.ceil(allPosts.length / pageSize)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		console.log();
		const response = {
			posts: paginatedPosts,
			meta: {
				totalPosts: allPosts.length,
				totalPages: Math.ceil(allPosts.length / pageSize),
				currentPage: page,
				postsPerPage: pageSize,
				hasPreviousPage: page > 1,
				hasNextPage: page < Math.ceil(allPosts.length / pageSize),
			},
		};
		return getSuccessResponse(200, 'Posts received', response);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
