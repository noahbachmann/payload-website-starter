import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import { DefaultTemplate } from '@payloadcms/next/templates'

export default function Dashboard(
	{
		initPageResult,
		params,
		searchParams,
	}: AdminViewServerProps
) {
	const {
		req: { user },
	} = initPageResult

	if (!user) {
		return <p>You must be logged in to view this page.</p>
	}

	return (
		<DefaultTemplate
			i18n={ initPageResult.req.i18n }
			locale={ initPageResult.locale }
			params={ params }
			payload={ initPageResult.req.payload }
			permissions={ initPageResult.permissions }
			searchParams={ searchParams }
			user={ initPageResult.req.user || undefined }
			visibleEntities={ initPageResult.visibleEntities }>

			<Gutter>
				<h1>Custom Dashboard View</h1>
				<p>Welcome to your custom dashboard!</p>
			</Gutter>
	</DefaultTemplate>
	)
}