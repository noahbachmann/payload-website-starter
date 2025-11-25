'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signup } from '../actions'
import SubmitButton from '@/app/components/SubmitButton'

interface SignupParams {
	email: string
	password: string
	password_confirm: string
}

export default function Signup() {
	const [sError, setSError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignupParams>()

	async function onSignup(data: SignupParams) {
		setSError(null)
		setIsLoading(true)

		if (data.password !== data.password_confirm) {
			setError('password_confirm', { type: 'pattern', message: 'Passwords do not match' })
			setIsLoading(false)
			return
		}

		const result = await signup({
			email: data.email,
			password: data.password,
		})

		if (result.success) {
			router.push('/')
		} else {
			setIsLoading(false)
			setSError(result.error || 'An unknown error occurred')
		}
	}

	return (
		<form className="flex-1 flex flex-col justify-evenly gap-5 p-10" onSubmit={ handleSubmit(onSignup) }>
			<input
				className={ `${errors.email ? 'error' : ''}` }
				type="email" placeholder="Your email"
				{ ...register('email', { required: true, maxLength: 50, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ }) } />
			{ errors.email?.type === 'pattern' && <p className="text-red-500 text-sm">Please input a real e-mail.</p> }

			<input
				className={ `${errors.password ? 'error' : ''}` }
				type="password"
				placeholder="Your password"
				{ ...register('password', { required: true, maxLength: 50, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/ }) } />
			{ errors.password?.type === 'pattern' && <p className="text-red-500 text-sm">Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.</p> }

			<input
				className={ `${errors.password_confirm ? 'error' : ''}` }
				type="password"
				placeholder="Confirm password"
				{ ...register('password_confirm', { required: true }) } />
			{ errors.password_confirm?.type === 'pattern' && <p className="text-red-500 text-sm">{ errors.password_confirm.message }</p> }

			<p className={ sError ? 'block' : 'hidden' }>{ sError }</p>

			<SubmitButton loading={ isLoading } text="Sign Up" />

			<Link className="text-[1rem]!" href="/auth/login">Already have an account?</Link>
			<Link className="font-normal! text-[1rem]!" href="/auth/password">Forgot Password?</Link>
		</form>
	)
}