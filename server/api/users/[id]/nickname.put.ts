import { isValidObjectId } from 'mongoose';
import IAccessToken from '~/interfaces/IAccessToken';
import Nickname from '~/server/models/Nickname';
import User from '~/server/models/User';
import createStatActivity from '~/server/utils/createStatActivity';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) {
			throw createError({ statusCode: 401, message: 'Invalid access token' });
		}

		const targetId = getRouterParam(e, 'id');
		if (!isValidObjectId(targetId)) {
			throw createError({ statusCode: 400, message: 'Invalid target ID' });
		}

		const { nickname } = await readBody(e);
		if (typeof nickname !== 'string' || !nickname.length) {
			throw createError({ statusCode: 400, message: 'Invalid nickname' });
		}

		const me = await User.findById(decodedToken.id);
		if (!me) {
			throw createError({
				statusCode: 404,
				message: "User with ID from access token doesn't exist",
			});
		}

		const nicknameRel = await Nickname.findOne({
			nicknameCreatorId: me._id,
			nicknamedUserId: targetId,
		});

		createStatActivity(me._id.toString());

		if (!nicknameRel) {
			const newNicknameRel = new Nickname({
				nicknameCreatorId: me._id,
				nicknamedUserId: targetId,
				nickname,
			});

			await newNicknameRel.save();

			return getSuccessResponse(200, 'Created and updated nickname');
		}

		nicknameRel.nickname = nickname;
		nicknameRel.markModified('nickname');
		await nicknameRel.save();

		return getSuccessResponse(200, 'Updated nickname');

		return getSuccessResponse(200, 'Updated nickname');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
