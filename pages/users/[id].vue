<script setup lang="ts">
	import PostCard from '~/components/features/posts/PostCard.vue';
	import UserProfileDetails from '~/components/features/users/UserProfileDetails.vue';
	import MyHeader from '~/components/layout/MyHeader.vue';
	import SquareBigButton from '~/components/ui/SquareBigButton.vue';
	import { IconArrowLeft, IconArrowRight } from '~/components/ui/icons';
	import UsersService from '~/services/UsersService';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	const { isAuthenticated } = useCurrentUserStore();

	const userId = computed(() => {
		const id = useRoute().params['id'];
		return Array.isArray(id) ? id[0] : id;
	});

	useHead({ title: `User ${userId.value}` });

	const { user, activity } = useUserById(userId.value);

	const { posts, curPage, totalPages, toPrevPage, toNextPage } = useUserPosts(
		userId.value
	);

	const {
		data: isAlreadyFollowed,
		isLoading: isCheckLoading,
		check,
	} = useCheckIfFollowUser(userId.value);

	// TODO: convert to function
	const {
		feedback,
		isLoading: isFollowLoading,
		error,
		followUser,
	} = useFollowUser(userId.value);

	const handleFollowAndUnfollow = () => {
		if (isAlreadyFollowed.value) unfollowUser();
		else followUser().then(() => check()); // locally better?
	};

	const unfollowUser = async () => {
		try {
			await UsersService.unfollowUser(userId.value);

			check();
		} catch (err) {
			console.error(err);
		}
	};
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">Profile</h1>

			<div class="flex items-start justify-between">
				<UserProfileDetails
					:username="user?.username || 'Guest'"
					:age="user?.age !== undefined ? String(user.age) : 'N/A'"
					:location="user?.location || 'Unknown'"
					:last-logged-in="activity || 'Unknown'"
					:rating="user?.rating || 0"
				/>

				<template v-if="isAuthenticated">
					<div class="mt-8 grid grid-rows-3 place-items-center">
						<SquareBigButton
							class="font-tnr uppercase tracking-wider"
							:class="{
								'bg-red-400': isAlreadyFollowed,
								'bg-[#77fc6b]': !isAlreadyFollowed,
							}"
						>
							<p v-show="isFollowLoading || isCheckLoading">Loading...</p>

							<p
								v-show="!isFollowLoading || !isCheckLoading"
								@click="handleFollowAndUnfollow"
							>
								{{ isAlreadyFollowed ? 'Unfollow' : 'Follow' }}
							</p>
						</SquareBigButton>

						<p v-show="feedback" class="font-bold text-green-800">
							{{ feedback }}
						</p>
						<p v-show="error">{{ error }}</p>
					</div>
				</template>
			</div>
		</main>

		<div class="mt-8 grid grid-cols-2 gap-4 px-4">
			<PostCard v-for="p in posts" :post="p" />
		</div>

		<div
			v-show="totalPages"
			class="ml-auto mt-8 flex max-w-32 -translate-x-12 items-center justify-evenly bg-[#5bb9cd] px-4 py-2 text-white"
		>
			<div class="scale-150 cursor-pointer" @click="toPrevPage()">
				<IconArrowLeft />
			</div>

			<p class="text-xl font-bold">{{ curPage }}/{{ totalPages }}</p>

			<div class="scale-150 cursor-pointer" @click="toNextPage()">
				<IconArrowRight />
			</div>
		</div>
	</div>
</template>
