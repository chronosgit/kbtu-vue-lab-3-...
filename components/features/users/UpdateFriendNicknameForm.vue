<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';
	import UsersService from '~/services/UsersService';

	const props = withDefaults(
		defineProps<{ friendId: string; existingNickname?: string | null }>(),
		{ existingNickname: '' }
	);
	const emit = defineEmits<{
		(e: 'closeThisForm'): void;
		(e: 'onUpdateSuccess'): void;
	}>();

	const nickname = ref(props.existingNickname || '');

	const updateNickname = async () => {
		try {
			await UsersService.updateMyFriendNickname(
				props.friendId,
				nickname.value?.trim()
			);

			emit('onUpdateSuccess');
		} catch (err) {
			console.error(err);
		}
	};

	const onUpdateChange = (e: Event) => {
		nickname.value = (e.target as HTMLInputElement).value;
	};
</script>

<template>
	<form class="rounded-md bg-white p-2" @submit.prevent="updateNickname">
		<div class="mb-4 flex items-center justify-between gap-1">
			<label for="nickname" class="text-lg">Update nickname</label>

			<button type="button" @click="emit('closeThisForm')">
				<IconClose class="scale-75 text-black" />
			</button>
		</div>

		<div class="flex items-center justify-between gap-4">
			<input
				:value="nickname"
				id="nickname"
				type="text"
				placeholder="Your nickname"
				class="basis-[70%] bg-zinc-200 p-2 text-black placeholder:text-black"
				required
				@input="onUpdateChange"
			/>

			<button
				type="submit"
				class="basis-[30%] rounded-md bg-green-400 px-4 py-2 font-bold uppercase text-white transition-colors hover:bg-green-500"
			>
				Update
			</button>
		</div>
	</form>
</template>
