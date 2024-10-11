export default function () {
	const form = useState('loginForm', () => ({
		username: '',
		password: '',
	}));

	return form;
}
