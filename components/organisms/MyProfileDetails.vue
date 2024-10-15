<script setup lang="ts">
	import SquareTextInput from '~/components/atoms/SquareTextInput.vue';
	import RatingStars from '~/components/molecules/RatingStars.vue';

	const props = defineProps<{ username: string; rating: number }>();

	const ageModel = defineModel<string>('age');
	const locationModel = defineModel<string>('location');
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

			<div class="flex items-center gap-4">
				<label
					for="/users/me:input-age"
					class="text-outline text-2xl text-yellow-300"
				>
					Age:
				</label>

				<SquareTextInput
					v-model="ageModel"
					id="/users/me/:input-age"
					name="age"
					placeholder="?"
					class="max-w-12 text-center text-xl"
				/>
			</div>

			<SquareTextInput
				v-model="locationModel"
				placeholder="Your location"
				class="max-w-56 text-center text-xl"
			/>

			<p class="text-xl font-bold text-[#00ffa3] drop-shadow-md">
				Activity: for now
			</p>

			<div class="flex items-center">
				<p class="text-outline text-xl font-bold text-white drop-shadow-md">
					Current rating:
				</p>

				<RatingStars :rating="props.rating" />
			</div>
		</div>
	</div>
</template>
