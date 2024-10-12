import useUserStore from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware(async () => {
	const { isAuthenticated } = useUserStore();

	// Authenticated, all good
	if (isAuthenticated.value) return;

	return navigateTo('/auth/registration');
});
