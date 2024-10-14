import useCurrentUserStore from '~/store/useCurrentUserStore';
import AuthService from '~/services/AuthService';
import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const { loginUser } = useCurrentUserStore();

	useAsyncData('restoreAuth', async () => {
		try {
			const res = await AuthService.restoreAuthentication();
			const { user } = res.data as { user: IMyUser };

			loginUser(user);

			return res;
		} catch (err) {
			console.error(err);

			return null;
		}
	});
}
