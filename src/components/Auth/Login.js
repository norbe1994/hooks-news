import React from 'react'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'

const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
}

function Login(props) {
	const {
		handleSubmit,
		handleBlur,
		handleChange,
		values: { name, email, password },
		errors,
		isSubmitting,
	} = useFormValidation(INITIAL_STATE, validateLogin)
	const [login, setLogin] = React.useState(false)

	return (
		<div>
			<h2 className='mv3'>{login ? 'Login' : 'Create Account'}</h2>
			<form onSubmit={handleSubmit} className='flex flex-column'>
				{!login && (
					<input
						onChange={handleChange}
						value={name}
						name='name'
						type='text'
						placeholder='Your name'
						autoComplete='off'
					/>
				)}
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					value={email}
					name='email'
					type='text'
					className={errors.email && 'error-input'}
					placeholder='Your email'
					autoComplete='off'
				/>
				{errors.email && <p className='error-text'>{errors.email}</p>}
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					value={password}
					name='password'
					type='password'
					className={errors.password && 'error-input'}
					placeholder='Choose a secure password'
				/>
				{errors.password && <p className='error-text'>{errors.password}</p>}
				<div className='flex mt3'>
					<button
						type='submit'
						className='button pointer mr2'
						disabled={isSubmitting}
						style={{ background: isSubmitting ? 'grey' : 'orange' }}
					>
						Submit
					</button>
					<button
						type='button'
						className='button pointer'
						onClick={() => setLogin(prevLogin => !prevLogin)}
					>
						{login ? 'need to create an account?' : 'already have an account?'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
