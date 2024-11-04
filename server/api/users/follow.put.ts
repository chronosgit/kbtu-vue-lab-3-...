import { isValidObjectId } from 'mongoose';
import User from '~/server/models/User';
import IAccessToken from '~/interfaces/IAccessToken';

export default defineEventHandler(async (e) => {
	try {
		const decoded = e.context.decodedToken as IAccessToken;
		const { userId: targetId } = await readBody(e);

		if (!decoded) {
			throw createError({ statusCode: 401, statusMessage: 'No access token' });
		}

		if (!isValidObjectId(targetId)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid user ID',
			});
		}

		const me = await User.findOne({
			_id: decoded.id,
		});
		if (!me) throw createError({ statusCode: 400 });

		me.followings.push({ userId: targetId });

		await me.save();

		return getSuccessResponse(200, 'User followed');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
