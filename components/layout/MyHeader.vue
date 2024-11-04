<script setup lang="ts">
	import LoginPopup from '~/components/features/auth/LoginPopup.vue';
	import SidebarMenu from '~/components/layout/SidebarMenu.vue';
	import Dropdown from '~/components/shared/Dropdown.vue';
	import { IconBurger, IconUser } from '~/components/ui/icons';
	import useCurrentUserStore from '~/store/useCurrentUserStore';

	const { isAuthenticated, logoutUser } = useCurrentUserStore();

	const {
		isActive: isDropdown,
		activate: openDropdown,
		disactivate: closeDropdown,
	} = useClickawayClient('dropdown');

	const {
		isActive: isSidebar,
		activate: openSidebar,
		disactivate: closeSidebar,
	} = useClickawayClient('sidebar-menu-ref');

	const { isActive: isLoginPopup, activate: openLoginPopup } =
		useClickawayClient('login-popup-ref');

	const onUserIconClick = () => {
		if (isDropdown.value) closeDropdown();
		else openDropdown();
	};

	const onDropdownLoginButtonClick = () => {
		closeDropdown();
		closeSidebar();
		openLoginPopup();
	};
</script>

<template>
	<!-- Header controlled organisms -->
	<SidebarMenu ref="sidebar-menu-ref" :is-active="isSidebar" />
	<LoginPopup ref="login-popup-ref" :is-open="isLoginPopup" />

	<!-- Actual header -->
	<header
		class="mb-8 flex items-center justify-between gap-4 bg-white bg-opacity-45 p-2"
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

		<ClientOnly>
			<div class="relative cursor-pointer">
				<div @click.stop="onUserIconClick">
					<IconUser />
				</div>

				<Dropdown ref="dropdown" :is-open="isDropdown" :snap-to-right="true">
					<div
						class="mt-1 text-center font-tnr text-xl font-bold uppercase text-[#548eff]"
					>
						<template v-if="isAuthenticated">
							<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
								<NuxtLink to="/users/me" class="text-outline">
									My Profile
								</NuxtLink>
							</div>

							<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
								<NuxtLink to="/users/me/compose" class="text-outline">
									Compose
								</NuxtLink>
							</div>

							<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
								<NuxtLink to="/users/me/followings" class="text-outline">
									Favourites
								</NuxtLink>
							</div>

							<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
								<p class="text-outline" @click="logoutUser">Log out</p>
							</div>
						</template>

						<template v-else>
							<div class="border-[1px] border-black bg-[#43e567] p-2">
								<p
									class="text-outline"
									@click.stop="onDropdownLoginButtonClick()"
								>
									Login
								</p>
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
						</template>
					</div>
				</Dropdown>
			</div>
		</ClientOnly>
	</header>
</template>
