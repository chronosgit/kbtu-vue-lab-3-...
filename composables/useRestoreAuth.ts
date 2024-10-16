import useCurrentUserStore from '~/store/useCurrentUserStore';
import AuthService from '~/services/AuthService';
import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const { loginUser } = useCurrentUserStore();

	useLazyAsyncData(
		'restoreAuth',
		async () => {
			try {
				const res = await AuthService.restoreAuthentication();
				const { user } = res.data as { user: IMyUser };

				loginUser(user);

				await navigateTo('/users/me');
				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ server: false }
	);
}
