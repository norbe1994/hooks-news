export default function validateCreateLink(values) {
	let errors = {}
	const { description, url } = values

	// description errors
	if (!description) {
		errors.description = 'Description is required'
	} else if (description.length < 10) {
		errors.description = 'Description must be at least 10 characters long'
	}
	// URL errors
	if (!url) {
		errors.url = 'URL is required'
	} else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
		errors.url = 'URL format is invalid'
	}

	return errors
}
