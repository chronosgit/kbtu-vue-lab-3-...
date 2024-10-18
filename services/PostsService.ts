class PostsService {
	static getPosts(
		page: number,
		pageSize: number,
		filter: string,
		topic: string
	) {
		return $fetch('/api/posts', { params: { page, pageSize, filter, topic } });
	}

	static getMyPosts() {
		return $fetch('/api/users/me/posts');
	}

	static createPost(description: string) {
		return $fetch('/api/posts', { method: 'POST', body: { description } });
	}

	static deleteMyPost(postId: string) {
		return $fetch('/api/users/me/posts', {
			method: 'DELETE',
			body: { postId },
		});
	}
}

export default PostsService;
