<script setup lang="ts">
	import PostCard from '~/components/features/posts/PostCard.vue';
	import MyProfileDetails from '~/components/features/users/MyProfileDetails.vue';
	import { IconArrowLeft, IconArrowRight } from '~/components/ui/icons';
	import LoadingSpinner from '~/components/ui/LoadingSpinner.vue';
	import SquareBigButton from '~/components/ui/SquareBigButton.vue';

	definePageMeta({ middleware: '4-protect-route', layout: 'main' });
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

	const { posts, curPage, totalPages, deletePost, toPrevPage, toNextPage } =
		useMyPosts();
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3] pt-20"
	>
		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">My Profile</h1>

			<div class="items-start justify-between md:flex">
				<MyProfileDetails
					:username
					:rating
					v-model:age="age"
					v-model:location="location"
				/>

				<div class="grid grid-rows-4 gap-4 font-tnr">
					<SquareBigButton @click="navigateTo('/me/stats')">
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

			<div class="mt-8 grid grid-cols-2 gap-4">
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

			<div
				v-show="!totalPages"
				class="text-lg font-bold uppercase text-white drop-shadow-md"
			>
				No posts
			</div>
		</main>
	</div>
</template>
