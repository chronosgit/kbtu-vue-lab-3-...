<script setup lang="ts">
	import useCurrentUserStore from '~/store/useCurrentUserStore';
	import type IChatMessage from '~/interfaces/features/chats/IChatMessage';

	const curUserStore = useCurrentUserStore();

	const props = defineProps<{ message: IChatMessage }>();

	const isMsgMine = computed(
		() => curUserStore.user.value?.id === props.message.authorId
	);
</script>

<template>
	<div
		class="flex items-start gap-4"
		:class="{
			'flex-row-reverse': isMsgMine,
			'flex-row': !isMsgMine,
		}"
	>
		<div class="flex items-center gap-2">
			<img
				src="~/assets/images/avatar-placeholder.png"
				alt="avatar"
				class="max-w-16"
			/>

			<div class="space-4 grid">
				<p
					v-if="isMsgMine"
					class="text-outline text-lg font-bold text-violet-600"
				>
					You
				</p>

				<NuxtLink
					v-else
					:to="`/users/${props.message.authorId}`"
					class="text-outline text-lg font-bold text-violet-600"
				>
					{{ props.message.authorUsername }}
				</NuxtLink>

				<p class="text-outline font-medium text-green-500">
					{{ convertDateTimeToPostHistoryString(props.message.timestamp) }}
				</p>
			</div>
		</div>

		<div class="grow-0 rounded-md bg-white p-2">
			<p class="font-tnr text-lg font-bold">
				{{ props.message.content }}
			</p>
		</div>
	</div>
</template>
