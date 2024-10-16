class PostsService {
	static getPosts(page: number, pageSize: number, filter: string) {
		return $fetch('/api/posts', { params: { page, pageSize, filter } });
	}

	static createPost(description: string) {
		return $fetch('/api/posts', { method: 'POST', body: { description } });
	}
}

export default PostsService;
