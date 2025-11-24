'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import type { Customer } from '@/payload-types'

export interface LoginParams {
	email: string
	password: string
}
interface LoginResponse {
	success: boolean
	error?: string
}

export type Result = {
	exp?: number
	token?: string
	user?: Customer
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
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