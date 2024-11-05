import type IUserFriend from '~/interfaces/features/users/IUserFriend';
import type IServerApiResponse from '~/interfaces/IServerApiResponse';
import type IUser from '~/interfaces/IUser';

class UsersService {
	static async updateMe(age: string, location: string) {
		return $fetch('/api/users/me', { method: 'PUT', body: { age, location } });
	}

	static async getMe() {
		return $fetch('/api/users/me');
	}

	static getUser(userId: string) {
		return $fetch(`/api/users/${userId}`);
	}

	static followUser(userId: string) {
		return $fetch(`/api/users/follow`, { method: 'PUT', body: { userId } });
	}

	static unfollowUser(userId: string) {
		return $fetch(`/api/users/${userId}/unfollow`, { method: 'PUT' });
	}

	static checkIfFollowUser(userId: string) {
		return $fetch<IServerApiResponse<boolean>>(
			`/api/users/${userId}/check-follow`
		);
	}

	static getMyFollowings() {
		return $fetch<IServerApiResponse<{ users: IUser[] }>>(
			'/api/users/me/followings'
		);
	}

	static updateMyFriendNickname(friendId: string, nickname: string) {
		if (typeof nickname !== 'string' || !nickname.length) {
			throw createError('Invalid nickname');
		}

		return $fetch(`/api/users/${friendId}/nickname`, {
			method: 'PUT',
			body: { nickname },
		});
	}

	static getUserFollowings(userId: string) {
		if (!userId) return;

		return $fetch<IServerApiResponse<IUserFriend[]>>(
			`/api/users/${userId}/friends`
		);
	}
}

export default UsersService;
