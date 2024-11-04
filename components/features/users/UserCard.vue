<script setup lang="ts">
	import type IUser from '~/interfaces/IUser';
	import UsersService from '~/services/UsersService';

	const props = defineProps<{ user: IUser }>();
	const visitLinkUrl = computed(() => `/users/${props.user.id}`);

	const { data, isLoading, check } = useCheckIfFollowUser(props.user.id);

	const unfollow = async () => {
		await UsersService.unfollowUser(props.user.id);

		check();
	};
</script>

<template>
	<article class="flex gap-5">
		<!-- User details -->
		<div class="flex items-center gap-4">
			<img
				src="~/assets/images/avatar-placeholder.png"
				alt="avatar"
				class="max-h-24 rounded-full bg-cyan-300"
			/>

			<div class="space-y-2">
				<NuxtLink
					:to="visitLinkUrl"
					class="text-outline text-2xl font-bold text-blue-500"
				>
					{{ props.user.username }}
				</NuxtLink>

				<p class="text-outline font-bold text-emerald-300">
					Activity:
					{{ convertDateTimeToActivityString(props.user.lastLoggedIn) }}
				</p>
			</div>
		</div>
	</article>
</template>
