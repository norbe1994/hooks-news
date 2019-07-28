export default function validateLogin(values) {
	let errors = {}
	const { email, password } = values

	// email errors
	if (!email) {
		errors.email = 'Email is required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Email is invalid'
	}
	// password errors
	if (!password) {
		errors.password = 'Password is required'
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters long'
	}

	return errors
}
