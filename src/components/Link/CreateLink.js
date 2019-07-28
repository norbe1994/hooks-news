import React from 'react'
import validateCreateLink from '../Auth/validateCreateLink'
import useFormValidation from '../Auth/useFormValidation'
import { FirebaseContext } from '../../firebase'

const INITIAL_STATE = {
	description: '',
	url: '',
}

function CreateLink({ history: { push } }) {
	const { firebase, user } = React.useContext(FirebaseContext)
	const { handleSubmit, handleChange, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateCreateLink,
		handleCreateLink
	)
	const { description, url } = values

	function handleCreateLink() {
		if (!user) {
			push('/login')
		} else {
			const { url, description } = values
			const newLink = {
				url,
				description,
				postedBy: {
					id: user.uid,
					name: user.displayName,
				},
				votes: [],
				comments: [],
				created: Date.now(),
			}
			firebase.db.collection('links').add(newLink)
			push('/')
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-column mt3'>
			<input
				onChange={handleChange}
				value={description}
				name='description'
				placeholder='A description for your link'
				autoComplete='off'
				type='text'
				className={errors.description && 'error-input'}
			/>
			{errors.description && <p className='error-text'>{errors.description}</p>}
			<input
				onChange={handleChange}
				value={url}
				name='url'
				placeholder='The URL for the link'
				autoComplete='off'
				type='url'
				className={errors.url && 'error-input'}
			/>
			{errors.url && <p className='error-text'>{errors.url}</p>}

			<button type='submit' className='button'>
				Submit
			</button>
		</form>
	)
}

export default CreateLink
