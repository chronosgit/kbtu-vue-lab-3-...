<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import UserProfileDetails from '~/components/organisms/UserProfileDetails.vue';
	import SquareBigButton from '~/components/atoms/SquareBigButton.vue';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	const userId = computed(() => {
		const id = useRoute().params['id'];
		return Array.isArray(id) ? id[0] : id;
	});

	useHead({ title: `User ${userId.value}` });
	const { isAuthenticated } = useCurrentUserStore();

	const { user, activity } = useUserById(userId.value);
	const { followUser } = useFollowUser(userId.value);
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
				/>

				<template v-if="isAuthenticated">
					<div class="mt-8 grid grid-rows-1">
						<SquareBigButton
							class="bg-[#77fc6b] font-tnr uppercase tracking-wider"
							@click="followUser"
						>
							Follow
						</SquareBigButton>
					</div>
				</template>
			</div>
		</main>
	</div>
</template>
