export default interface IPost {
	_id: string;
	authorId: string;
	authorUsername: string;
	rating: number;
	likes: number;
	description: string;
	createdAt: string;
}
