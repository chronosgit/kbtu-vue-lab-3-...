import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;

		if (!decoded) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No access token',
			});
		}

		const my = await User.findById(decoded.id);
		if (!my) throw createError({ statusCode: 404 });

		const myFollowingsIds = my.followings.map((following) => following.userId);
		const users = await User.find({ _id: { $in: myFollowingsIds } });

		const usersToReturn = users.map((u) => {
			const nickname =
				my.followings.find((f) => f.userId.toString() === u.id.toString())
					?.nickname || null;

			console.log(my.followings);

			return {
				id: u._id,
				username: u.username,
				nickname,

				email: u.email,
				age: u.age,
				location: u.location,
				lastLoggedIn: u.lastLoggedIn,
				rating: u.rating,
				likes: u.likedPosts,
			};
		});

		return getSuccessResponse(200, 'My followings received', {
			users: usersToReturn,
		});
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
