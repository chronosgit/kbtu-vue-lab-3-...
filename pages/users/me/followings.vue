<script setup lang="ts">
	import UserCard from '~/components/atoms/UserCard.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';

	definePageMeta({
		middleware: '3-protect-route',
	});
	useHead({
		title: 'My followings',
	});

	const { users, fetchMyFollowings } = useMyFollowings();
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<h1
				class="mb-5 text-right font-tnr text-5xl text-white"
				@click="fetchMyFollowings()"
			>
				My followings
			</h1>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<template v-for="u in users">
					<div class="max-w-72 flex-shrink flex-grow">
						<UserCard :user="u" />
					</div>
				</template>
			</div>
		</main>
	</div>
</template>
