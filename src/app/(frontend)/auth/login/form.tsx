'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { login, LoginParams } from '../actions/login'
import SubmitButton from '@/app/components/SubmitButton'

export default function LoginForm() {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginParams>()

	async function onLogIn(data: LoginParams) {
		setError(null)
		setIsLoading(true)
		console.log('Logging in with data:', data)

		const result = await login({
			email: data.email,
			password: data.password,
		})

		if (result.success) {
			router.push('/')
		} else {
			setIsLoading(false)
			setError(result.error || 'An unknown error occurred')
		}
	}

	return(
	<form className="flex-1 flex flex-col justify-evenly gap-5 p-10" onSubmit={ handleSubmit(onLogIn) }>
		<input
			className={ `${errors.email ? 'error' : ''}` }
			type="email" placeholder="Your email"
			{ ...register('email', { required: true, maxLength: 50 }) } />

		<input
			className={ `${errors.password ? 'error' : ''}` }
			type="password"
			placeholder="Your password"
			{ ...register('password', { required: true, maxLength: 50 }) } />

		<p className={ error ? 'block' : 'hidden' }>{ error }</p>

		<SubmitButton loading={ isLoading } text="Log In" />

		<Link className="text-[1rem]!" href="/auth/signup">Create an account</Link>
		<Link className="font-normal! text-[1rem]!" href="/auth/password">Forgot Password?</Link>
	</form>
	)
}