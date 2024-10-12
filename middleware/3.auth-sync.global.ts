import type IMyUser from '~/interfaces/IMyUser';
import useUserStore from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware(async () => {
	const accessToken = useCookie('access_token');
	if (!accessToken.value) return;

	const { data } = await $fetch('/api/auth/check');
	if (!data.value || !data.value.data) return;

	const user = data.value.data;
	if (!user) return;

	const { loginUser } = useUserStore();
	loginUser(user as IMyUser);
});
