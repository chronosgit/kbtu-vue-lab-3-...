export default interface IPost {
	authorId: string;
	authorNickname?: string | null;
	authorUsername: string;
	createdAt: string;
	description: string;
	likes: number;
	rating: number;
	topic: string;
	_id: string;
}
