import type IUser from '~/interfaces/IUser';
import useUserStore from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware(async () => {
	const accessToken = useCookie('access_token');
	if (!accessToken.value) return;

	const { data } = await useFetch('/api/auth/check');
	if (!data.value || !data.value.data) return;

	const { user } = data.value.data as { user: IUser };
	if (!user) return;

	const { loginUser } = useUserStore();

	loginUser(user);
});
