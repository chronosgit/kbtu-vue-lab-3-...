import type IRegistrationFormItem from '~/interfaces/IRegistrationFormItem';

export default function () {
	const form = ref<IRegistrationFormItem[]>([
		{
			id: 'email',
			inputType: 'email',
			label: 'Enter your email',
			value: '',
			placeholder: 'user@example.com',
		},
		{
			id: 'username',
			inputType: 'text',
			label: 'Create username',
			value: '',
			placeholder: 'user',
		},
		{
			id: 'password',
			inputType: 'password',
			label: 'Create password',
			value: '',
			placeholder: '*********',
		},
		{
			id: 're-password',
			inputType: 'password',
			label: 'Confirm password',
			value: '',
			placeholder: '*********',
		},
	]);

	const isConfirmationPanelActive = ref(false);

	const onFormValueChange = (event: Event) => {
		const { value: newValue, id: formInputId } =
			event.target as HTMLInputElement;

		const formItem = form.value.find((i) => i.id === formInputId);

		if (!formItem) {
			throw createError({
				statusMessage: "Registration form item with such ID doesn'n exist",
			});
		}

		formItem.value = newValue;
	};

	const toConfirmPanel = () => (isConfirmationPanelActive.value = true);

	return { form, isConfirmationPanelActive, onFormValueChange, toConfirmPanel };
}
