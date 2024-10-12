<script setup lang="ts">
	import RegularTextInput from '~/components/atoms/RegularTextInput.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import useUserStore from '~/store/useUserStore';

	definePageMeta({ middleware: 'auth' });
	useHead({ title: 'My profile' });

	const { user } = useUserStore();

	const none = useMyProfile(user.value);
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-2">
			<MyHeader />
		</div>

		<main class="px-4">
			<h1 class="text-right font-tnr text-5xl text-white">My Profile</h1>

			<div class="flex items-center justify-between">
				<div class="">
					<!-- Avatar -->

					<div class="space-y-2 font-tnr">
						<p class="text-outline text-3xl tracking-widest text-pink-500">
							{{ user?.username }}
						</p>

						<p
							v-if="user?.age != null"
							class="text-outline text-lg text-yellow-300"
						>
							Age: {{ user?.age }}
						</p>
						<!-- <RegularTextInput
							v-else
							v-model:model-value="age"
							placeholder="Add your age"
							@on-enter-key="onAgeInputEnterClick"
						/> -->

						<p>Location: {{ user?.location }}</p>

						<p>Activity: for now</p>

						<p>Current rating: {{ user?.rating }}</p>
					</div>
				</div>

				<button
					class="text-outline bg-[#69FF59] p-2 font-tnr text-3xl uppercase text-white"
					@click=""
				>
					Follow
				</button>
			</div>
		</main>
	</div>
</template>
