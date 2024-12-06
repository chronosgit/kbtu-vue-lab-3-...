<script setup lang="ts">
	import type IUser from '~/interfaces/features/users/IUser';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	const curUserStore = useCurrentUserStore();

	const props = defineProps<{ user: IUser }>();
	const visitLinkUrl = computed(() => {
		if (props.user._id === curUserStore.user.value?.id) return '/me';

		return `/users/${props.user._id}`;
	});
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
				<!-- <NuxtLink
					v-if="(props.user as OldInterfaceUser).nickname"
					:to="visitLinkUrl"
					class="text-outline text-2xl font-bold text-blue-500"
				>
					{{ (props.user as IMyFriend).nickname }} ({{ props.user.username }})
				</NuxtLink> -->

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
