<script setup lang="ts">
	import MyHeader from '~/components/layout/MyHeader.vue';
	import LoadingSpinner from '~/components/ui/LoadingSpinner.vue';

	useHead({ title: 'Authentication' });

	const {
		form,
		isRegistrationReqLoading,
		error,
		onFormSubmit,
		onFormValueChange,
	} = useRegistration();
</script>

<template>
	<div
		class="max-w-screen h-screen bg-gradient-to-b from-[#84cae9] via-[#bddded] to-[#faf2f3]"
	>
		<div class="mb-8">
			<MyHeader />
		</div>

		<div class="px-2">
			<div class="mx-auto my-0 w-full max-w-[80%] lg:max-w-[50%]">
				<div class="mb-16 max-w-max rounded-lg bg-[#62e3eb] px-2 py-3">
					<p class="font-tnr text-xl font-semibold uppercase text-white">
						Profile | Registration
					</p>
				</div>

				<form
					class="mb-3 flex items-end justify-between gap-4"
					@submit.prevent="onFormSubmit"
				>
					<div class="flex flex-col gap-2">
						<!-- Email -->
						<div class="flex flex-col gap-1 text-xl">
							<label for="email" class="font-tnr font-semibold text-white">
								Enter your email
							</label>

							<input
								type="email"
								id="email"
								:value="form.email"
								placeholder="user@example.com"
								required
								class="w-screen max-w-48 rounded-xl bg-[#74f0f0] p-2 font-tnr font-semibold text-white placeholder-white sm:max-w-96"
								@change="(e) => onFormValueChange(e)"
							/>
						</div>

						<!-- Username -->
						<div class="flex flex-col gap-1 text-xl">
							<label for="username" class="font-tnr font-semibold text-white">
								Create username
							</label>

							<input
								type="text"
								id="username"
								:value="form.username"
								placeholder="user"
								required
								class="w-screen max-w-48 rounded-xl bg-[#74f0f0] p-2 font-tnr font-semibold text-white placeholder-white sm:max-w-96"
								@change="(e) => onFormValueChange(e)"
							/>
						</div>

						<!-- Password -->
						<div class="flex flex-col gap-1 text-xl">
							<label for="password" class="font-tnr font-semibold text-white">
								Create password
							</label>

							<input
								type="password"
								id="password"
								:value="form.password"
								placeholder="*********"
								required
								class="w-screen max-w-48 rounded-xl bg-[#74f0f0] p-2 font-tnr font-semibold text-white placeholder-white sm:max-w-96"
								@change="(e) => onFormValueChange(e)"
							/>
						</div>

						<!-- Confirm password -->
						<div class="flex flex-col gap-1 text-xl">
							<label
								for="re-password"
								class="font-tnr font-semibold text-white"
							>
								Confirm password
							</label>

							<input
								type="password"
								id="re-password"
								:value="form.rePassword"
								placeholder="*********"
								required
								class="w-screen max-w-48 rounded-xl bg-[#74f0f0] p-2 font-tnr font-semibold text-white placeholder-white sm:max-w-96"
								@change="(e) => onFormValueChange(e)"
							/>
						</div>
					</div>

					<button
						class="whitespace-nowrap rounded-lg bg-[#49f364] px-4 py-2 font-tnr font-semibold uppercase text-white sm:text-xl"
					>
						<LoadingSpinner
							v-show="isRegistrationReqLoading"
							bg-color="bg-white"
							class="pointer-events-none m-3 justify-center"
						/>

						<p v-show="!isRegistrationReqLoading">Create user</p>
					</button>
				</form>

				<p v-show="error" class="text-lg font-bold text-error-solid">
					{{ error }}
				</p>
			</div>
		</div>
	</div>
</template>
