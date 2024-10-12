import type IUser from '~/interfaces/IUser';
import type CustomizeableProfileInputs from '~/enums/CustomizeableProfileInputs';

// WARN: possible logic flaw
// Initial user state is a global state
// Will its alterations change the profile value too?
export default function (initialUserState: IUser) {
	const profile = ref({
		username: initialUserState.username,
		age: initialUserState.age?.toString() || '',
		location: initialUserState.location?.toString() || '',
		lastLoggedIn: initialUserState.lastLoggedIn,
		rating: initialUserState.rating,
	});

	const onInputEnterKey = (
		input: CustomizeableProfileInputs,
		value: string
	) => {};

	return { profile, onInputEnterKey };
}
