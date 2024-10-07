import DummyModel from '../models/Dummy';

export default defineEventHandler(async () => {
	try {
		const dummyData = await DummyModel.find();

		return getSuccessResponse(
			200,
			'API is running, dummy data received',
			dummyData
		);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
