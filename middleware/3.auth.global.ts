import useCurrentUserStore from '~/store/useCurrentUserStore';
import AuthService from '~/services/AuthService';
import type IMyUser from '~/interfaces/IMyUser';

export default defineNuxtRouteMiddleware(() => {
	const { loginUser } = useCurrentUserStore();

	useAsyncData(
		'restoreAuthentication',
		async () => {
			try {
				const res = await AuthService.restoreAuthentication();

				const { user } = res.data as { user: IMyUser };
				loginUser(user);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ server: false }
	);
});
