import IAccessToken from '~/interfaces/IAccessToken';
import User from '~/server/models/User';

export default defineEventHandler(async (e) => {
	try {
		const { email } = e.context.decodedToken as IAccessToken;

		const user = await User.findOne({ email });

		return getSuccessResponse(200, 'User updated', { user });
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
