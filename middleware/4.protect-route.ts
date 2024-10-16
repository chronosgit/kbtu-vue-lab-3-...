import useCurrentUserStore from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware((to) => {
	const { isAuthenticated } = useCurrentUserStore();

	if (isAuthenticated.value) return;

	if (to.path === '/auth/registration') return;

	return navigateTo('/auth/registration');
});
