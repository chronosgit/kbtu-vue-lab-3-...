import type IUser from '~/interfaces/IUser';

export default interface IMyFriend extends IUser {
	nickname?: string | null;
}
