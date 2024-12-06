<script setup lang="ts">
	import {
		IconCar,
		IconCart,
		IconGlobe,
		IconMoneyBag,
	} from '~/components/ui/icons';
	import TopicItem from './TopicItem.vue';

	const topics = [
		{
			icon: IconCar,
			name: 'Adventure',
			url: '/topics/adventure',
		},
		{
			icon: IconGlobe,
			name: 'Nature',
			url: '/topics/nature',
		},
		{
			icon: IconCart,
			name: 'Fashion',
			url: '/topics/fashion',
		},
		{
			icon: IconMoneyBag,
			name: 'Modern',
			url: '/topics/modern',
		},
	];
</script>

<template>
	<section class="grid grid-cols-3 grid-rows-3 gap-2">
		<TopicItem
			v-for="(t, i) in topics"
			:key="i"
			:icon="t.icon"
			:topic-uri="t.url"
		>
			<p class="text-xl font-medium text-white">{{ t.name }}</p>
		</TopicItem>

		<div
			v-for="i in 9 - topics.length"
			class="aspect-square rounded-lg bg-[#b0d17c] p-3"
		></div>
	</section>
</template>
