<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import MyProfileDetails from '~/components/organisms/MyProfileDetails.vue';
	import SquareBigButton from '~/components/atoms/SquareBigButton.vue';
	import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue';

	definePageMeta({ middleware: '3-protect-route' });
	useHead({ title: 'My profile' });

	const { username, age, location, feedback, error, isLoading, updateProfile } =
		useMyProfile();
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<h1 class="mb-5 text-right font-tnr text-5xl text-white">My Profile</h1>

			<div class="flex items-start justify-between">
				<MyProfileDetails
					:username="username"
					v-model:age="age"
					v-model:location="location"
				/>

				<div class="grid grid-rows-4 gap-4 font-tnr">
					<SquareBigButton @click="console.log('Stats be like:')">
						Statistic
					</SquareBigButton>

					<SquareBigButton class="uppercase" @click="updateProfile">
						<LoadingSpinner
							v-show="isLoading"
							bg-color="bg-white"
							class="justify-center"
						/>

						<p v-show="!isLoading">Save</p>
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
		</main>
	</div>
</template>
