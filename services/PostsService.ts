class PostsService {
	static getPosts(page: number, pageSize: number, filter: string) {
		return $fetch('/api/posts', { params: { page, pageSize, filter } });
	}
}

export default PostsService;
