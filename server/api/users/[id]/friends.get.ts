import { isValidObjectId } from 'mongoose';
import Friendship from '~/server/models/Friendship';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const userId = getRouterParam(e, 'id');
		if (!isValidObjectId(userId)) throw createError({ statusCode: 400 });

		const user = await User.findById(userId);
		if (!user) throw createError({ statusCode: 404 });

		const friendships = await Friendship.find({ friends: { $in: [user._id] } });

		const friendsIds = friendships
			.flatMap((friendship) => friendship.friends)
			.filter((id) => id.toString() !== user._id.toString());

		const friends = await Promise.all(
			friendsIds
				.map(async (id) => {
					const user = await User.findById(id).select('-password').lean();

					return user;
				})
				.filter((u) => u != null)
		);

		return getSuccessResponse(200, 'Received friends', friends);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
