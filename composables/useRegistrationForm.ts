export default function () {
	interface FormItem {
		id: string;
		label: string;
		value: string;
	}

	const form = ref<FormItem[]>([
		{
			id: 'email',
			label: 'Enter your email',
			value: '',
		},
		{
			id: 'username',
			label: 'Create username',
			value: '',
		},
		{
			id: 'password',
			label: 'Create password',
			value: '',
		},
		{
			id: 're-password',
			label: 'Confirm password',
			value: '',
		},
	]);

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

	const onFormSubmit = () => {
		console.log(form);
	};

	return { form, onFormValueChange, onFormSubmit };
}
