import type IPost from '~/interfaces/IPost';
import type IPostsMeta from '~/interfaces/IPostsMeta';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';

class PostsService {
	static getPosts(
		page: number,
		pageSize: number,
		filter: string,
		topic: string
	) {
		return $fetch<
			IServerApiResponse<{
				posts: IPost[];
				meta: IPostsMeta;
			}>
		>('/api/posts', { params: { page, pageSize, filter, topic } });
	}

	static getUserPosts(userId: string, page: number, pageSize: number) {
		return $fetch(`/api/users/${userId}/posts`, {
			params: { userId, page, pageSize },
		});
	}

	static getMyPosts(page: number, pageSize: number) {
		return $fetch('/api/users/me/posts', {
			method: 'GET',
			params: { page, pageSize },
		});
	}

	static createPost(description: string, topic: string) {
		return $fetch('/api/posts', {
			method: 'POST',
			body: { description, topic },
		});
	}

	static deleteMyPost(postId: string) {
		return $fetch('/api/users/me/posts', {
			method: 'DELETE',
			body: { postId },
		});
	}
}

export default PostsService;
