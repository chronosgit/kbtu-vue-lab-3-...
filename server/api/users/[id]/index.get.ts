import { isValidObjectId, mongo } from 'mongoose';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const userId = getRouterParam(e, 'id');

		if (!isValidObjectId(userId)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid user ID',
			});
		}

		const user = await User.findOne(
			{ _id: new mongo.ObjectId(userId) },
			{
				username: true,
				age: true,
				location: true,
				lastLoggedIn: true,
				rating: true,
			}
		);

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: "User doesn't exist",
			});
		}

		return getSuccessResponse(200, 'User received', { user });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
