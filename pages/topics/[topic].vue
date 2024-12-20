<script setup lang="ts">
	import PostCard from '~/components/features/posts/PostCard.vue';
	import ChevronShapeTemplate from '~/components/shared/ChevronShapeTemplate.vue';
	import Dropdown from '~/components/shared/Dropdown.vue';
	import {
		IconArrowLeft,
		IconArrowRight,
		IconCaretDown,
	} from '~/components/ui/icons';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	definePageMeta({ middleware: '5-topic-check', layout: 'main' });

	const {
		params: { topic },
	} = useRoute() as { params: { topic?: string } };

	useHead({ title: topic ? `${capitalize(topic)} blog` : 'Blog' });

	const { isAuthenticated } = useCurrentUserStore();

	if (!topic) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid topic parameter.',
			fatal: true,
		});
	}

	const {
		filters,
		posts,
		curPage,
		totalPages,
		hasNextPage,
		hasPrevPage,
		toPrevPage,
		toNextPage,
		likePost,
	} = usePosts(topic);

	const { isActive: isFiltersActive, toggle: toggleFilters } =
		useClickawayClient('filters-ref');
</script>

<template>
	<div
		class="min-w-screen min-h-screen bg-trees bg-cover bg-center pt-20 font-poppins"
	>
		<main class="mx-auto my-0 max-w-screen-lg px-4">
			<ChevronShapeTemplate
				class="bg-white bg-opacity-80 px-4 py-32 text-2xl font-bold uppercase text-white shadow-lg"
			>
				<div class="mb-4 max-w-max rounded-lg bg-[#5ab8cd] p-4">
					<p>{{ getReadableDate(new Date()) }}</p>
				</div>

				<div class="mb-8 flex items-center justify-between gap-4">
					<div
						class="max-w-max rounded-lg bg-[#5ab8cd] px-4 py-2 text-2xl font-bold"
					>
						<p>{{ topic }}</p>
					</div>

					<div class="flex items-center gap-4">
						<div class="relative">
							<div
								ref="filters-ref"
								class="flex cursor-pointer items-center gap-2 bg-[#eefcf7] p-2 shadow-lg"
								@click="toggleFilters()"
							>
								<p class="capitalize text-[#1de390]">
									{{ filters.slice(1).toLowerCase() || 'No filter' }}
								</p>

								<IconCaretDown class="scale-150 text-gray-500" />

								<Dropdown
									:is-open="isFiltersActive"
									class="left-0 right-0 top-0"
									:class="{ 'translate-y-12': isFiltersActive }"
								>
									<div
										class="space-y-2 bg-[#eefcf7] px-2 capitalize text-[#1de390]"
									>
										<p class="cursor-pointer" @click="filters = '-RATING'">
											Rating
										</p>

										<p class="cursor-pointer" @click.="filters = '-TIME'">
											Time
										</p>
									</div>
								</Dropdown>
							</div>
						</div>

						<ClientOnly>
							<div
								v-show="totalPages"
								class="flex items-center gap-4 text-[#73c2d2]"
							>
								<IconArrowLeft
									class="scale-125 cursor-pointer"
									:class="{ 'cursor-not-allowed': !hasPrevPage }"
									@click="toPrevPage()"
								/>

								<p class="select-none font-tnr text-3xl font-bold">
									{{ `${curPage}/${totalPages}` }}
								</p>

								<IconArrowRight
									class="scale-125 cursor-pointer"
									:class="{ 'cursor-not-allowed': !hasNextPage }"
									@click="toNextPage()"
								/>
							</div>
						</ClientOnly>

						<div v-show="!totalPages" class="bg-[#eefcf7]">
							<p class="px-4 py-2 text-[#1de390]">No posts</p>
						</div>
					</div>
				</div>

				<div
					v-if="Array.isArray(posts) && posts.length"
					class="grid grid-cols-1 gap-4 md:grid-cols-2"
				>
					<PostCard v-for="p in posts" :post="p">
						<template #btn-action v-if="isAuthenticated">
							<button
								class="rounded-lg bg-[#43ef27] px-5 py-1 font-poppins font-bold uppercase text-white"
								@click="likePost(p._id)"
							>
								Like
							</button>
						</template>
					</PostCard>
				</div>

				<p v-else class="text-black">No posts</p>
			</ChevronShapeTemplate>
		</main>
	</div>
</template>
