export default interface IUser {
	id: string | null;
	username: string | null;
	email: string | null;
	age?: number | null;
	location?: string | null;
	lastLoggedIn: string | null;
	rating?: number | null;
	likes: number | null;
	isEmailConfirmed: boolean | null;
	// posts: []
}
