import IAccessToken from '~/interfaces/IAccessToken';
import Statistics from '~/server/models/Statistics';

export default defineEventHandler(async (e) => {
	try {
		const decodedToken = e.context.decodedToken as IAccessToken;
		if (!decodedToken) throw createError({ statusCode: 401 });

		const myStats = await Statistics.findOne({ userId: decodedToken.id });
		if (!myStats) throw createError({ statusCode: 404 });

		myStats.activities.sort((a, b) => Number(a) - Number(b));

		return getSuccessResponse(200, 'Received my statistics', myStats);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
