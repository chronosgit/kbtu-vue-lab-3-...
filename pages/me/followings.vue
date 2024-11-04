<script setup lang="ts">
	import UserCard from '~/components/features/users/UserCard.vue';
	import MyHeader from '~/components/layout/MyHeader.vue';

	definePageMeta({
		middleware: '4-protect-route',
	});
	useHead({
		title: 'My followings',
	});

	const { users, fetchMyFollowings, unfollowUser } = useMyFollowings();
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="mx-auto my-0 px-4">
			<h1
				class="mb-5 text-right font-tnr text-5xl text-white"
				@click="fetchMyFollowings()"
			>
				My friends
			</h1>

			<div class="grid justify-center gap-4">
				<UserCard v-for="u in users" :user="u">
					<template #buttons>
						<div class="flex items-center gap-4">
							<button
								class="rounded-full bg-red-500 px-4 py-1 font-medium uppercase text-white"
								@click="unfollowUser(u.id)"
							>
								Unfollow
							</button>

							<button
								class="rounded-full bg-cyan-500 px-4 py-1 font-medium uppercase text-white"
							>
								Rename
							</button>

							<button
								class="rounded-full bg-green-300 px-4 py-1 font-medium uppercase text-white"
								@click="console.log('just chatting')"
							>
								Chat
							</button>
						</div>
					</template>
				</UserCard>
			</div>
		</main>
	</div>
</template>
