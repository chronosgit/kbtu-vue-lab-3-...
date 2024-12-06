<script setup lang="ts">
	definePageMeta({ layout: 'main' });
	useHead({ title: 'Confirmation' });

	const {
		email,
		secretPhrase,
		error,
		sendConfirmationLetter,
		activateAccount,
	} = useAccountActivation();
</script>

<template>
	<div
		class="h-screen w-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3] p-20"
	>
		<div class="px-2">
			<div
				class="mx-auto my-0 flex flex-col items-center bg-gradient-to-b from-[#61eee6] via-[#53c6bf] to-[#318a84] px-2 py-6 sm:max-w-[80%]"
			>
				<div class="mb-10 max-w-max rounded-xl bg-white p-3 text-center">
					<p class="font-tnr font-bold uppercase">
						To create account do next steps
					</p>
				</div>

				<div class="mb-12 grid grid-cols-2 grid-rows-2 items-center gap-y-3">
					<p class="font-tnr uppercase text-white">Enter your email</p>

					<input
						type="email"
						v-model="email"
						placeholder="user@email.com"
						class="bg-[#44b3d6] p-2 text-lg font-bold text-white placeholder-white"
					/>

					<p class="font-tnr uppercase text-white">Confirm you email</p>

					<button
						class="rounded-lg bg-[#d6e243] p-2 font-tnr font-black uppercase"
						@click="sendConfirmationLetter()"
					>
						Click to confirm
					</button>

					<p class="font-tnr uppercase text-white">Enter the secret phrase</p>

					<input
						type="password"
						v-model="secretPhrase"
						placeholder="***********"
						class="bg-[#44b3d6] p-2 text-lg font-bold text-white placeholder-white"
					/>
				</div>

				<button
					class="mb-4 rounded-full bg-[#44b3d6] px-8 py-2 font-tnr font-semibold uppercase text-white"
					@click="activateAccount()"
				>
					Activate user
				</button>

				<p v-show="error" class="text-lg font-bold text-error-solid">
					{{ error }}
				</p>
			</div>
		</div>
	</div>
</template>
