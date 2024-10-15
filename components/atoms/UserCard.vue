<script setup lang="ts">
	import type IUser from '~/interfaces/IUser';

	const props = defineProps<{ user: IUser }>();

	const visitLinkUrl = computed(() => `/users/${props.user.id}`);
</script>

<template>
	<div
		class="flex items-center justify-between gap-8 rounded-lg bg-cyan-300 px-4 py-2"
	>
		<img
			src="~/assets/images/avatar-placeholder.png"
			alt="avatar"
			class="max-h-24"
		/>

		<div class="space-y-2">
			<p class="text-outline font-bold text-blue-500">
				{{ props.user.username }}
			</p>

			<p class="text-yellow-300">
				{{ props.user.rating }}
			</p>

			<NuxtLink :to="visitLinkUrl" class="font-bold uppercase text-blue-600">
				Visit profile
			</NuxtLink>
		</div>
	</div>
</template>
