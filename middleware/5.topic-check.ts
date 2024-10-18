export default defineNuxtRouteMiddleware(async (to) => {
	try {
		const topic = to.params.topic[0];

		if (!topic) return navigateTo('/not-found');

		const topics = ['ADVENTURE', 'NATURE', 'FASHION', 'MODERN'];

		if (!topics.includes(topic)) return navigateTo('/not-found');
	} catch (err) {
		console.error(err);
	}
});
