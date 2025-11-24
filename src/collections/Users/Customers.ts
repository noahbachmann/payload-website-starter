import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
	slug: 'customers',
	admin: {
		defaultColumns: ['email'],
		useAsTitle: 'email',
	},
	auth: true,
	fields: [
	],
}