import React from 'react'

function useFormValidation(initialState) {
	const [values, setValue] = React.useState(initialState)

	function handleChange(event) {
		event.persist()
		const { name, value } = event.target
		setValue(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}

	function handleSubmit(event) {
		event.preventDefault()
		console.log(values)
	}

	return { handleSubmit, handleChange, values }
}

export default useFormValidation
