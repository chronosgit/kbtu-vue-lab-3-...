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
			{ password: false }
		);

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: "User doesn't exist",
			});
		}

		const userToReturn = {
			id: user._id,
			username: user.username,
			email: user.email,
			age: user.age,
			location: user.location,
			lastLoggedIn: user.lastLoggedIn,
			rating: user.rating,
			likes: user.likes,
		};
		return getSuccessResponse(200, 'User received', { user: userToReturn });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
