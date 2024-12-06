<script setup lang="ts">
	import { IconUser } from '~/components/ui/icons';
	import AdText from './AdText.vue';
	import useCurrentUserStore from '~/store/useCurrentUserStore';
	import LoginPopup from '~/components/features/auth/LoginPopup.vue';
	import Dropdown from '~/components/shared/Dropdown.vue';

	const { isAuthenticated, logoutUser } = useCurrentUserStore();

	const {
		isActive: isDropdown,
		activate: openDropdown,
		disactivate: closeDropdown,
	} = useClickawayClient('dropdown');

	const onUserIconClick = () => {
		if (isDropdown.value) closeDropdown();
		else openDropdown();
	};

	const { isActive: isLoginPopup, activate: openLoginPopup } =
		useClickawayClient('login-popup-ref');

	const onDropdownLoginButtonClick = () => {
		closeDropdown();
		openLoginPopup();
	};
</script>

<template>
	<LoginPopup ref="login-popup-ref" :is-open="isLoginPopup" />

	<header
		class="mb-8 flex items-center justify-between bg-gradient-to-r from-yellow-200 to-yellow-300"
	>
		<AdText class="truncate pl-8 text-xl font-bold" />

		<div class="relative flex-shrink-0">
			<button
				class="flex aspect-[1/1] h-auto w-[10%] items-center justify-center bg-[#7eefff]"
				@click.stop="onUserIconClick"
			>
				<IconUser class="" />
			</button>

			<Dropdown ref="dropdown" :is-open="isDropdown" :snap-to-right="true">
				<div
					class="mt-1 text-center font-tnr text-xl font-bold uppercase text-[#548eff]"
				>
					<template v-if="isAuthenticated">
						<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
							<NuxtLink to="/me" class="text-outline"> My Profile </NuxtLink>
						</div>

						<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
							<NuxtLink to="/me/compose" class="text-outline">
								Compose
							</NuxtLink>
						</div>

						<div class="border-[1px] border-black bg-cyan-300 p-2 text-white">
							<NuxtLink to="/me/followings" class="text-outline">
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
	</header>
</template>
