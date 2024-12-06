export default interface IUser {
	_id: string;
	age?: number | null;
	createdAt: string;
	email: string;
	followings: Array<unknown>;
	isEmailConfirmed: boolean;
	lastLoggedIn: string;
	location?: string | null;
	rating: number;
	updatedAt: string;
	username: string;
	nickname?: string | null;
}
