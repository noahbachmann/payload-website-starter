'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { Customer } from '@/payload-types'

export interface AuthParams {
	email: string
	password: string
}
export interface AuthResponse {
	success: boolean
	error?: string
}

export type Result = {
	exp?: number
	token?: string
	user?: Customer
}

export async function login({ email, password }: AuthParams): Promise<AuthResponse> {
	const payload = await getPayload({ config })
	try {
		const result: Result = await payload.login({
			collection: 'customers',
			data: { email, password }
		})

		if (result.token) {
			const cookieStore = await cookies()
			cookieStore.set('payload_token', result.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				path: '/',
			})

			return { success: true }
		} else {
			return { success: false,  error: 'No token returned' }
		}
	} catch(error){
		console.log(error)
		return { success: false, error: 'Login failed' }
	}
}

export async function signup({ email, password }: AuthParams): Promise<AuthResponse> {
	const payload = await getPayload({ config })
	try {
		await payload.create({
			collection: 'customers',
			data: { email, password }
		})

		const result: Result =  await payload.login({
			collection: 'customers',
			data: { email, password }
		})

		if (result.token) {
			const cookieStore = await cookies()
			cookieStore.set('payload_token', result.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				path: '/',
			})

			return { success: true }
		} else {
			return { success: false,  error: 'Login failed' }
		}
	} catch(error){
		console.log(error)
		return { success: false, error: 'Signup failed' }
	}
}