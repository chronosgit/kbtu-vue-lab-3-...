import AuthService from '~/services/AuthService';
import useCurrentUserStore from '~/store/useCurrentUserStore';
import type IMyUser from '~/interfaces/IMyUser';

export default function () {
	const { loginUser, logoutUser } = useCurrentUserStore();

	const { execute: validate } = useAsyncData(
		'validateAuthentication',
		async () => {
			try {
				const res = await AuthService.validateAuthentication();

				const { user } = res.data as { user: IMyUser };
				loginUser(user);

				return res;
			} catch (err) {
				console.error('Authentication was invalid');
				logoutUser();

				return null;
			}
		},
		{ immediate: false }
	);

	onMounted(() => validate());

	return validate;
}
