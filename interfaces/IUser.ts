export default interface IUser {
	id: string;
	username: string;
	email: string;
	age?: number;
	location?: string;
	lastLoggedIn: string;
	rating?: number;
	likes?: number;
	isEmailConfirmed?: boolean;
	// posts: []
}
