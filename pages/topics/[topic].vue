<script setup lang="ts">
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import SidebarMenu from '~/components/organisms/SidebarMenu.vue';

	const {
		params: { topic },
	} = useRoute() as { params: { topic?: string } };

	if (!topic) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid topic parameter.',
			fatal: true,
		});
	}

	const sidebarMenuRef = useTemplateRef('sidebar-menu-ref');

	const { activate, isActive } = useClickaway(sidebarMenuRef);

	watchEffect(() => {
		useHead({ title: capitalize(topic) + ' blog' });
	});
</script>

<template>
	<div class="w-screen h-screen bg-center bg-cover bg-trees">
		<SidebarMenu ref="sidebar-menu-ref" :is-active="isActive" />

		<div class="pt-2">
			<MyHeader @burger-click="activate()" />
		</div>
	</div>
</template>
