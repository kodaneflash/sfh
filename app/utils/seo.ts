import { getGenericSocialImage, images } from '#app/images.tsx'

export function getSocialMetas({
	url,
	title = 'Empowering solo entrepreneurs to build and scale successful online businesses',
	description = 'Join our community and access insightful blogs, comprehensive courses, useful tools, resources, and curated startup ideas for solo entrepreneurs to build and scale successful online businesses',
	image = getGenericSocialImage({
		url,
		words: title,
		featuredImage: images.kodyFlyingSnowboardingBlue.id,
	}),
	keywords = '',
}: {
	image?: string
	url: string
	title?: string
	description?: string
	keywords?: string
}) {
	return [
		{ title },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ name: 'image', content: image },
		{ name: 'og:url', content: url },
		{ name: 'og:title', content: title },
		{ name: 'og:description', content: description },
		{ name: 'og:image', content: image },
		{
			name: 'twitter:card',
			content: image ? 'summary_large_image' : 'summary',
		},
		{ name: 'twitter:creator', content: '@kentcdodds' },
		{ name: 'twitter:site', content: '@kentcdodds' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: image },
		{ name: 'twitter:image:alt', content: title },
	]
}
