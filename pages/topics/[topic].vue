<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import Dropdown from '~/components/molecules/Dropdown.vue';
	import PostCard from '~/components/molecules/PostCard.vue';
	import ArrowLeft from '~/components/atoms/ArrowLeft.vue';
	import ArrowRight from '~/components/atoms/ArrowRight.vue';
	import CaretDown from '~/components/atoms/CaretDown.vue';
	import ChevronShapeTemplate from '~/components/atoms/ChevronShapeTemplate.vue';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	definePageMeta({ middleware: '5-topic-check' });

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

	const filtersRef = useTemplateRef('filters-ref');
	const { isActive: isFiltersActive, toggle: toggleFilters } =
		useClickawayClient(filtersRef);
</script>

<template>
	<div
		class="max-w-screen min-h-screen bg-trees bg-cover bg-center font-poppins"
	>
		<div class="pt-2">
			<MyHeader />
		</div>

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

								<CaretDown class="scale-150 text-gray-500" />

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
								<ArrowLeft
									class="scale-125 cursor-pointer"
									:class="{ 'cursor-not-allowed': !hasPrevPage }"
									@click="toPrevPage()"
								/>

								<p class="select-none font-tnr text-3xl font-bold">
									{{ `${curPage}/${totalPages}` }}
								</p>

								<ArrowRight
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

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
			</ChevronShapeTemplate>
		</main>
	</div>
</template>
