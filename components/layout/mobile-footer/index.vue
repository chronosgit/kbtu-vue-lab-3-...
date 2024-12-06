<script setup lang="ts">
	import {
		IconArrowDownward,
		IconComment,
		IconHeart,
		IconWindows,
	} from '~/components/ui/icons';
	import TopicsGallery from './components/TopicsGallery.vue';

	const { state: isExtended, toggleState: toggleFooter } = useToggle();
</script>

<template>
	<footer
		class="fixed bottom-0 left-0 right-0 z-40 gap-1 space-y-8 rounded-t-md bg-gradient-to-r from-[#a8d859] via-[#96b74a] to-[#85973c] px-6 py-4 md:hidden"
	>
		<div
			class="flex w-full justify-between"
			:class="{ 'h-1/2 items-start': isExtended, 'items-center': !isExtended }"
		>
			<NuxtLink
				to="/me/followings"
				class="flex scale-150 items-center justify-between"
			>
				<IconComment />
			</NuxtLink>

			<button
				class="flex scale-150 items-center justify-between"
				@click="toggleFooter"
			>
				<IconArrowDownward v-if="isExtended" />

				<IconWindows v-else />
			</button>

			<NuxtLink to="/me" class="flex scale-150 items-center justify-between">
				<IconHeart />
			</NuxtLink>
		</div>

		<!-- When footer is extended, this gallery appears -->
		<TopicsGallery v-if="isExtended" />
	</footer>
</template>
