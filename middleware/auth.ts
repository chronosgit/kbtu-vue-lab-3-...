import type IUser from '~/interfaces/IUser';
import useUserStore from '~/store/useUserStore';

export default defineNuxtRouteMiddleware(async () => {
	const { isAuthenticated, loginUser } = useUserStore();

	// Authenticated, all good
	if (isAuthenticated.value) return;

	// Not-authenticated
	if (isAuthenticated.value === false) return navigateTo('/auth/registration');

	// State is resetted, means I need to try reauthenticate
	const accessToken = useCookie('access_token');
	if (!accessToken.value) return navigateTo('/auth/registration');

	const { data } = await useFetch('/api/auth/check');
	if (!data.value || !data.value.data) return navigateTo('/auth/registration');

	const { user } = data.value.data as { user: IUser };
	if (!user) return navigateTo('/auth/registration');

	loginUser(user);
});
