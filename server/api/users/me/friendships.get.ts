import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';
import Friendship from '~/server/models/Friendship';
import getMyNicknameForUser from '~/server/utils/business/getMyNicknameForUser';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) {
			throw createError({
				statusCode: 401,
				statusMessage: 'No access token',
			});
		}

		const my = await User.findById(decodedToken.id);
		if (!my) {
			throw createError({
				statusCode: 404,
				message: "User with ID from the access token doesn't exist",
			});
		}

		const myFriendships = await Friendship.find({ friends: { $in: [my._id] } });
		if (!myFriendships || myFriendships.length === 0) {
			throw createError({
				statusCode: 404,
				statusMessage: 'No friendships found for this user',
			});
		}

		const myFriendsIds = myFriendships.flatMap((mf) =>
			mf.friends.filter((f) => !f.equals(my._id))
		);
		const myFriends = await Promise.all(
			myFriendsIds.map(async (id) => {
				const friend = await User.findById(id).select('-password').lean();

				return friend;
			})
		);

		const returnedMyFriends = await Promise.all(
			myFriends
				.filter((f) => f != null)
				.map(async (f) => {
					const nickname = await getMyNicknameForUser(
						decodedToken.id,
						f._id.toString()
					);

					console.log(nickname);

					return { ...f, nickname };
				})
		);

		return getSuccessResponse(200, 'My followings received', returnedMyFriends);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
