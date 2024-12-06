import Post from '~/server/models/Post';
import { H3Event } from 'h3';
import User from '~/server/models/User';
import Nickname from '~/server/models/Nickname';
import IAccessToken from '~/interfaces/IAccessToken';
import getMyNicknameForUser from '~/server/utils/business/getMyNicknameForUser';

export default defineEventHandler(async (e: H3Event) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken | undefined;

		const {
			page: qPage = 1,
			pageSize: qPageSize = 4,
			filter,
			topic,
		} = getQuery(e);

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

		const filteredPosts = await Post.find({
			topic: { $regex: topic, $options: 'i' },
		}).sort(sortOptions);

		if (filteredPosts.length === 0) {
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

		if (page > Math.ceil(filteredPosts.length / pageSize)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid query parameters',
			});
		}

		const posts = await Post.find({
			topic: { $regex: topic, $options: 'i' },
		})
			.sort(sortOptions)
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.lean();

		const totalPages = Math.ceil(filteredPosts.length / pageSize);
		const meta = {
			totalPosts: filteredPosts.length,
			totalPages,
			currentPage: page,
			postsPerPage: pageSize,
			hasPreviousPage: page > 1,
			hasNextPage: page < totalPages,
		};

		if (decodedToken != null && typeof decodedToken.id === 'string') {
			const postsWithPossibleAuthorNicknames = await Promise.all(
				posts.map(async (p) => {
					const nickname = await getMyNicknameForUser(
						decodedToken.id,
						p.authorId.toString()
					);

					return {
						...p,
						authorNickname: nickname,
					};
				})
			);

			return getSuccessResponse(200, 'Posts received', {
				meta,
				posts: postsWithPossibleAuthorNicknames,
			});
		}

		return getSuccessResponse(200, 'Posts received', { meta, posts });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
