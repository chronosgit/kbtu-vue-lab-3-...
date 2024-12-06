<script setup lang="ts">
	import UserFriendCard from '~/components/features/users/UserFriendCard.vue';
	import MyHeader from '~/components/layout/my-header/index.vue';

	const {
		params: { id: userId },
	} = useRoute();

	useHead({ title: 'Their friends' });

	const { userFriends, areLoading } = useUserFriends(userId as string);
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<MyHeader />

		<main class="mx-auto my-0 px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">
				Their friends
			</h1>

			<!-- Users -->
			<section
				v-if="Array.isArray(userFriends) && userFriends.length"
				class="grid gap-4"
			>
				<UserFriendCard v-for="f in userFriends" :user="f" />
			</section>

			<p v-else class="text-outline text-2xl font-bold text-white">
				No friends lol
			</p>
		</main>
	</div>
</template>
