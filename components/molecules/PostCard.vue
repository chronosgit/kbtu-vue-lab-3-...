<script setup lang="ts">
	import type IPost from '~/interfaces/IPost';
	import RatingStars from './RatingStars.vue';

	const props = defineProps<{
		post: IPost;
	}>();

	const ts = computed(() =>
		convertDateTimeToPostHistoryString(props.post.createdAt)
	);
</script>

<template>
	<div class="rounded-md bg-[#5bb9cd] p-2">
		<div class="mb-2 flex items-center justify-between gap-4">
			<div class="space-y-4 rounded-md bg-[#73c3d3] p-2">
				<p class="text-lg font-medium text-white">
					{{ props.post.authorUsername }}
				</p>

				<p class="text-lg font-medium text-white">{{ ts }}</p>
			</div>

			<div class="space-y-5">
				<p class="text-center text-lg font-medium text-white">Rating</p>

				<RatingStars :rating="props.post.rating" />
			</div>

			<img
				class="max-h-24 max-w-24"
				src="~/assets/images/avatar-placeholder.png"
				alt="avatar"
			/>
		</div>

		<p class="mb-2 text-lg font-medium text-white">
			{{ props.post.description }}
		</p>

		<div class="text-right">
			<slot name="btn-action"></slot>
		</div>
	</div>
</template>
