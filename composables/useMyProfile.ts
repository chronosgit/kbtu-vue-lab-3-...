import type IUser from '~/interfaces/IUser';

export default function (initialUserState: IUser | null) {
	onMounted(() => console.log(initialUserState));
}
