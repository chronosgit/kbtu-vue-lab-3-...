import Post from '~/server/models/Post';
import { H3Event } from 'h3';

export default defineEventHandler(async (e: H3Event) => {
	try {
		const { page: qPage = 1, pageSize: qPageSize = 10, filter } = getQuery(e);

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

		const sortOptions: Record<string, 1 | -1> = {};

		if (typeof filter === 'string') {
			const filters = filter
				.split(',')
				.filter((f) => f.includes('TIME') || f.includes('RATING'))
				.slice(0, 2);
			const flags = ['+', '-'];

			filters.forEach((f) => {
				const flag = f.slice(0, 1);
				const filterField = f.slice(1);

				if (!flags.includes(flag)) return;

				switch (filterField) {
					case 'TIME':
						sortOptions.createdAt = flag === '+' ? 1 : -1;
						break;
					case 'RATING':
						sortOptions.rating = flag === '+' ? 1 : -1;
						break;
				}
			});
		}

		const totalPosts = await Post.countDocuments();
		const totalPages = Math.ceil(totalPosts / pageSize);

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
			return getSuccessResponse(200, 'No posts found', response);
		}

		if (page > totalPages) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		const posts = await Post.find()
			.sort(sortOptions)
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.lean();

		const postsToReturn = posts.map((p) => ({ ...p, id: p._id }));
		const response = {
			posts: postsToReturn,
			meta: {
				totalPosts,
				totalPages,
				currentPage: page,
				postsPerPage: pageSize,
				hasPreviousPage: page > 1,
				hasNextPage: page < totalPages,
			},
		};
		return getSuccessResponse(200, 'Posts received', response);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
