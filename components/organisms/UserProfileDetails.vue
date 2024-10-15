<script setup lang="ts">
	import RatingStars from '~/components/atoms/RatingStars.vue';

	const props = defineProps<{
		username: string;
		age: string;
		location: string;
		lastLoggedIn: string;
		rating: number;
	}>();
</script>

<template>
	<div class="flex items-center gap-6 font-tnr">
		<img
			src="~/assets/images/avatar-placeholder.png"
			alt="avatar"
			class="max-w-60 rounded-full"
		/>

		<div class="space-y-4">
			<p class="text-outline text-5xl text-blue-500">
				{{ props.username }}
			</p>

			<p class="text-outline text-2xl text-yellow-300">Age: {{ props.age }}</p>

			<p class="text-outline text-2xl text-yellow-300">{{ props.location }}</p>

			<p class="text-xl font-bold text-[#00ffa3] drop-shadow-md">
				Activity: {{ props.lastLoggedIn }}
			</p>

			<div class="flex items-center gap-4">
				<p class="text-outline text-xl font-bold text-white drop-shadow-md">
					Rating:
				</p>

				<RatingStars :rating="props.rating" />
			</div>
		</div>
	</div>
</template>
