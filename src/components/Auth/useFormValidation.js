import React from 'react'

function useFormValidation(initialState, validate, authenticate) {
	const [values, setValue] = React.useState(initialState)
	const [errors, setErrors] = React.useState({})
	const [isSubmitting, setSubmitting] = React.useState(false)

	React.useEffect(() => {
		if (isSubmitting) {
			const noErrors = Object.keys(errors).length === 0
			if (noErrors) {
				console.log('successfull form submission authenticated')
				authenticate()
				setSubmitting(false)
			} else {
				setSubmitting(false)
			}
		}
	}, [errors])

	function handleChange(event) {
		event.persist()
		const { name, value } = event.target
		setValue(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}

	function handleBlur() {
		const validationErrors = validate(values)
		setErrors(validationErrors)
	}

	function handleSubmit(event) {
		event.preventDefault()
		const validationErrors = validate(values)
		setErrors(validationErrors)
		setSubmitting(true)
	}

	return {
		handleSubmit,
		handleBlur,
		handleChange,
		values,
		errors,
		isSubmitting,
	}
}

export default useFormValidation
