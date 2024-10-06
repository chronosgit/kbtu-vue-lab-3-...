<script setup lang="ts">
	const props = defineProps<{ isActive: Boolean }>();

	const topicLinks = getTopicLinks();
</script>

<template>
	<aside
		class="absolute bottom-0 left-0 top-0 z-10 max-w-[50%] -translate-x-full space-y-5 bg-[#c1ebf1] p-2 transition-transform sm:max-w-none"
		:class="{ 'translate-x-0': props.isActive }"
	>
		<div class="rounded-lg bg-white p-1 text-center">
			<h2 class="font-handjet text-3xl font-bold uppercase text-gray-700">
				Menu
			</h2>
		</div>

		<div class="space-y-20 rounded-lg bg-white py-2">
			<div
				class="space-y-5 text-center font-handjet text-3xl font-semibold uppercase text-white"
			>
				<div
					v-for="tl in topicLinks"
					:class="['p-2', 'cursor-pointer', tl.twGradient]"
					@click="navigateTo(tl.url)"
				>
					<p>{{ tl.text }}</p>
				</div>
			</div>

			<div
				class="mx-4 rounded-lg bg-gradient-to-b from-[#acef8d] via-[#7ddb63] to-[#48c433] p-3 font-handjet font-bold text-white"
			>
				<h3 class="mb-3 text-center text-3xl font-bold uppercase">Contacts</h3>

				<ul class="space-y-3 text-2xl font-semibold">
					<li>Phone: +1(232)-23-45-22</li>
					<li>Address: Green st., Yalow park</li>
					<li>Email: Yallow@park.info</li>
				</ul>
			</div>
		</div>
	</aside>
</template>
