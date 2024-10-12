<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';

	definePageMeta({ middleware: '4-protect-route' });
	useHead({ title: 'My profile' });
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
				<!-- <MyProfileDetails
					v-model:age="profile.age"
					v-model:location="profile.location"
					:username="profile.username"
				/> -->

				<div class="grid grid-rows-2 gap-5 overflow-clip font-tnr">
					<button
						class="text-outline text-clip bg-[#6bebfc] px-4 py-1 text-3xl font-bold text-white drop-shadow-md"
						@click="console.log('Stats be like')"
					>
						Statistic
					</button>

					<!-- <button
						class="text-outline text-clip bg-[#6bebfc] px-4 py-1 text-3xl font-bold uppercase text-white drop-shadow-md"
						@click="onSaveBtnClick"
					>
						Save
					</button> -->

					<!-- <div class="space-y-1 justify-self-end">
						<p v-show="error" class="text-lg font-bold text-error-solid">
							{{ error }}
						</p>
						<p v-show="feedback" class="text-lg font-bold text-green-500">
							{{ feedback }}
						</p>
					</div> -->
				</div>
			</div>
		</main>
	</div>
</template>
