<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import MyProfileDetails from '~/components/organisms/MyProfileDetails.vue';
	import PostCard from '~/components/molecules/PostCard.vue';
	import SquareBigButton from '~/components/atoms/SquareBigButton.vue';
	import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue';

	definePageMeta({ middleware: '4-protect-route' });
	useHead({ title: 'My profile' });

	const {
		username,
		age,
		location,
		rating,
		feedback,
		error,
		isLoading,
		updateProfile,
	} = useMyProfile();

	const { posts, fetchMyPosts, deletePost } = useMyPosts();

	onMounted(() => fetchMyPosts());
</script>

<template>
	<div
		class="max-w-screen h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">My Profile</h1>

			<div class="flex items-start justify-between">
				<MyProfileDetails
					:username
					:rating
					v-model:age="age"
					v-model:location="location"
				/>

				<div class="grid grid-rows-4 gap-4 font-tnr">
					<SquareBigButton @click="console.log('Stats be like:')">
						Statistic
					</SquareBigButton>

					<SquareBigButton class="uppercase">
						<LoadingSpinner
							v-show="isLoading"
							bg-color="bg-white"
							class="justify-center"
						/>

						<p v-show="!isLoading" @click="updateProfile">Save</p>
					</SquareBigButton>

					<div class="space-y-1 justify-self-end">
						<p v-show="error" class="text-lg font-bold text-error-solid">
							{{ error }}
						</p>
						<p v-show="feedback" class="text-lg font-bold text-green-500">
							{{ feedback }}
						</p>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-4 bg-red-400">
				<PostCard v-for="p in posts" :post="p">
					<template #btn-action>
						<button
							class="rounded-lg bg-[#ef2757] px-3 py-1 text-lg font-medium uppercase text-white"
							@click="deletePost(p._id)"
						>
							Delete
						</button>
					</template>
				</PostCard>
			</div>
		</main>
	</div>
</template>
