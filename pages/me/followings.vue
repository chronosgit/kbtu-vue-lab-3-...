<script setup lang="ts">
	import MyFriendCard from '~/components/features/users/MyFriendCard.vue';
	import ChatsService from '~/services/ChatsService';

	const UpdateFriendNicknameForm = defineAsyncComponent(
		() => import('~/components/features/users/UpdateFriendNicknameForm.vue')
	);

	definePageMeta({
		middleware: '4-protect-route',
		layout: 'main',
	});
	useHead({
		title: 'My followings',
	});

	const { users, fetchMyFollowings, unfollowUser } = useMyFriendships();

	const {
		isActive: isForm,
		activate: openForm,
		disactivate: closeForm,
	} = useClickawayClient('update-friend-nickname-form');

	const onFriendNicknameUpdateSuccess = () => {
		fetchMyFollowings();
		closeForm();
	};

	const openChat = async (partnerId: string) => {
		const { data: chat } = await ChatsService.accessChatBlindly(partnerId);

		navigateTo(`/chats/${chat._id}`);
	};
</script>

<template>
	<div
		class="h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3] p-20"
	>
		<main class="mx-auto my-0 px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">My friends</h1>

			<!-- Users -->
			<section
				v-if="Array.isArray(users) && users.length > 0"
				class="grid justify-center gap-4"
			>
				<div v-for="u in users" class="flex gap-4">
					<MyFriendCard :user="u" />

					<!-- Buttons -->
					<div class="flex items-center gap-4">
						<button
							class="rounded-full bg-red-500 px-4 py-1 font-medium uppercase text-white"
							@click="unfollowUser(u._id)"
						>
							Unfollow
						</button>

						<button
							class="rounded-full bg-cyan-500 px-4 py-1 font-medium uppercase text-white"
							@click="openForm"
						>
							Rename
						</button>

						<button
							class="rounded-full bg-green-300 px-4 py-1 font-medium uppercase text-white"
							@click="openChat(u._id)"
						>
							Chat
						</button>
					</div>

					<!-- Absolute -->
					<Teleport to="body">
						<div
							ref="update-friend-nickname-form"
							class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
							:class="{ flex: isForm, hidden: !isForm }"
						>
							<UpdateFriendNicknameForm
								:friend-id="u._id"
								:existing-nickname="u.nickname"
								class="w-1/2"
								@close-this-form="closeForm"
								@on-update-success="onFriendNicknameUpdateSuccess"
							/>
						</div>
					</Teleport>
				</div>
			</section>

			<p v-else class="text-outline text-2xl font-bold text-white">
				No friends lol
			</p>
		</main>
	</div>
</template>
