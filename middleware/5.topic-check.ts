export default defineNuxtRouteMiddleware(async (to) => {
	try {
		const t = to.params.topic;

		if (!t) return navigateTo('/not-found');

		const topic = Array.isArray(t) ? t[0] : t;

		const topics = getPostTopics();

		if (!topics.includes(topic.toUpperCase())) return navigateTo('/not-found');
	} catch (err) {
		console.error(err);
	}
});
