<script setup lang="ts">
	const router = useRouter();

	const topicLinks = [
		{
			text: 'Adventure blog',
			url: '/topics/adventure',
			twGradient: 'bg-gradient-to-r from-[#4cd97c] to-[#3dd55f]',
		},
		{
			text: 'Nature blog',
			url: '/topics/nature',
			twGradient: 'bg-gradient-to-r from-[#5cde69] to-[#22cd1e]',
		},
		{
			text: 'Fashion blog',
			url: '/topics/fashion',
			twGradient: 'bg-gradient-to-r from-[#79de56] to-[#49e521]',
		},
		{
			text: 'Modern blog',
			url: '/topics/modern',
			twGradient: 'bg-gradient-to-r from-[#68e674] to-[#7dcc85]',
		},
	];
</script>

<template>
	<aside
		class="max-w-[50%] sm:max-w-none z-10 space-y-5 p-2 absolute left-0 top-0 bottom-0 bg-[#c1ebf1]"
	>
		<div class="p-1 text-center bg-white rounded-lg">
			<h2 class="text-3xl font-bold text-gray-700 uppercase font-handjet">
				Menu
			</h2>
		</div>

		<div class="py-2 space-y-20 bg-white rounded-lg">
			<div
				class="space-y-5 text-3xl font-semibold text-center text-white uppercase font-handjet"
			>
				<div
					v-for="tl in topicLinks"
					:class="'p-2 cursor-pointer ' + tl.twGradient"
					@click="router.push(tl.url)"
				>
					<p>{{ tl.text }}</p>
				</div>
			</div>

			<div
				class="font-handjet text-white font-bold p-3 mx-4 rounded-lg bg-gradient-to-b from-[#acef8d] via-[#7ddb63] to-[#48c433]"
			>
				<h3 class="mb-3 text-3xl font-bold text-center uppercase">Contacts</h3>

				<ul class="space-y-3 text-2xl font-semibold">
					<li>Phone: +1(232)-23-45-22</li>
					<li>Address: Green st., Yalow park</li>
					<li>Email: Yallow@park.info</li>
				</ul>
			</div>
		</div>
	</aside>
</template>
