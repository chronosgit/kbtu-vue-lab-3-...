<script setup lang="ts">
	import Dropdown from '../molecules/Dropdown.vue';
	import IconBurger from '../atoms/IconBurger.vue';
	import IconUser from '../atoms/IconUser.vue';
	import SidebarMenu from './SidebarMenu.vue';

	const dropdownRef = useTemplateRef('dropdown');
	const {
		isActive: isDropdown,
		activate: openDropdown,
		disactivate: closeDropdown,
	} = useClickawayClient(dropdownRef);

	const sidebarMenuRef = useTemplateRef('sidebar-menu-ref');
	const { isActive: isSidebar, activate: openSidebar } =
		useClickawayClient(sidebarMenuRef);

	const onUserIconClick = () => {
		if (isDropdown.value) closeDropdown();
		else openDropdown();
	};
</script>

<template>
	<SidebarMenu ref="sidebar-menu-ref" :is-active="isSidebar" />

	<header
		class="flex items-center justify-between gap-4 bg-white bg-opacity-45 p-2"
	>
		<div class="cursor-pointer" @click.stop="openSidebar">
			<IconBurger />
		</div>

		<div
			class="rounded-xl bg-gradient-to-r from-[#e5f67c] via-[#dfe84d] to-[#eaed39] p-2 text-center"
		>
			<span
				class="bg-gradient-to-r from-[#f9bf9d] via-[#ff9480] to-[#ff794f] bg-clip-text font-tnr text-lg text-transparent"
				>New trips on Fall season! Full details on our Instagram accounts</span
			>
		</div>

		<div class="relative cursor-pointer">
			<div @click.stop="onUserIconClick">
				<IconUser />
			</div>

			<Dropdown ref="dropdown" :is-open="isDropdown" :snap-to-right="true">
				<div
					class="mt-1 text-center font-tnr text-xl font-bold uppercase text-[#548eff]"
				>
					<div class="border-[1px] border-black bg-[#43e567] p-2">
						<p class="text-outline">Login</p>
					</div>

					<div class="border-[1px] border-black bg-[#f8f14d] p-2">
						<NuxtLink to="/auth/registration" class="text-outline"
							>Register</NuxtLink
						>
					</div>

					<div class="border-[1px] border-black bg-[#cfa0dd] p-2">
						<NuxtLink to="/auth/confirmation" class="text-outline"
							>Confirm</NuxtLink
						>
					</div>
				</div>
			</Dropdown>
		</div>
	</header>
</template>
