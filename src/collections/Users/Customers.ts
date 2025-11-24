import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
	slug: 'customers',
	admin: {
		defaultColumns: ['name', 'email'],
		useAsTitle: 'name',
	},
	auth: true,
	fields: [
		{
			name: 'name',
			type: 'text',
		},
	],
}