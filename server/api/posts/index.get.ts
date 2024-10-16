import Post from '~/server/models/Post';

export default defineEventHandler(async (e) => {
	try {
		const { page: qPage = 1, pageSize: qPageSize = 1, filter } = getQuery(e);

		const page = Number(qPage);
		const pageSize = Number(qPageSize);

		if (Number.isNaN(page) || Number.isNaN(pageSize)) {
			console.log(page, pageSize);
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		const allPosts = await Post.find();

		let filteredPosts = allPosts;

		// Filters
		if (typeof filter === 'string') {
			const filters = filter
				.split(',')
				.filter((f) => f.includes('TIME') || f.includes('RATING'))
				.slice(0, 2);
			const flags = ['+', '-'];

			filters.forEach(async (f) => {
				const flag = f.slice(0, 1);
				const filter = f.slice(1);

				if (!flags.includes(flag)) return;

				switch (filter) {
					case 'TIME':
						filteredPosts = await Post.find().sort({
							createdAt: flag === '+' ? 1 : -1,
						});
						break;
					case 'RATING':
						filteredPosts = await Post.find().sort({
							rating: flag === '+' ? 1 : -1,
						});
						break;
				}
			});
		}

		// Pagination
		const totalPages = Math.floor(filteredPosts.length / pageSize);

		if (!totalPages) {
			return getSuccessResponse(200, 'Posts received', {
				posts: [],
				meta: {
					totalPosts: 0,
					totalPages,
					currentPage: page,
					postsPerPage: pageSize,
					hasPreviousPage: false,
					hasNextPage: false,
				},
			});
		}

		if (page > totalPages) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		const paginatedPosts = filteredPosts.slice(
			(page - 1) * pageSize,
			page * pageSize
		);

		return getSuccessResponse(200, 'Posts received', {
			posts: paginatedPosts,
			meta: {
				totalPosts: allPosts.length,
				totalPages,
				currentPage: page,
				postsPerPage: pageSize,
				hasPreviousPage: page - 1 > 0,
				hasNextPage: page + 1 <= totalPages,
			},
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
