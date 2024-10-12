import useUserStore from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware(async () => {
	const { isAuthenticated } = useUserStore();

	// Authenticated, all good
	if (isAuthenticated.value) return;

	// Not-authenticated
	if (isAuthenticated.value === false) return navigateTo('/auth/registration');
});
