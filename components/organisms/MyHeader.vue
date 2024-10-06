<script setup lang="ts">
	import IconBurger from '../atoms/IconBurger.vue';
	import IconUser from '../atoms/IconUser.vue';

	const emit = defineEmits<{
		(e: 'burgerClick'): void;
	}>();

	const onUserClick = () => console.log('user');
</script>

<template>
	<header
		class="flex items-center justify-between gap-4 p-2 bg-white bg-opacity-45"
	>
		<div class="cursor-pointer" @click.stop="emit('burgerClick')">
			<IconBurger />
		</div>

		<div
			class="p-2 rounded-xl text-center bg-gradient-to-r from-[#e5f67c] via-[#dfe84d] to-[#eaed39]"
		>
			<span
				class="font-tnr text-lg bg-gradient-to-r from-[#f9bf9d] via-[#ff9480] to-[#ff794f] bg-clip-text text-transparent"
				>New trips on Fall season! Full details on our Instagram accounts</span
			>
		</div>

		<div class="cursor-pointer" @click.stop="onUserClick">
			<IconUser />
		</div>
	</header>
</template>
