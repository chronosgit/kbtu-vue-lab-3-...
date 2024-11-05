import { isValidObjectId } from 'mongoose';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const userId = getRouterParam(e, 'id');
		if (!isValidObjectId(userId)) throw createError({ statusCode: 400 });

		const user = await User.findById(userId);
		if (!user) throw createError({ statusCode: 404 });

		const users = await Promise.all(
			user.followings.map(async (u) => {
				const i = await User.findById(u.userId, {
					password: false,
					email: false,
					isEmailConfirmed: false,
					followings: false,
				}).lean();

				return i;
			})
		);

		console.log(users);

		return getSuccessResponse(200, 'Received friends', users);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
