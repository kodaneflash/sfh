import { type LoaderFunctionArgs } from '@remix-run/node'
import { getBlogMdxListItems } from '#app/utils/mdx.server.ts'
import { formatDate, getDomainUrl } from '#app/utils/misc.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	const posts = await getBlogMdxListItems({ request })

	const blogUrl = `${getDomainUrl(request)}/blog`

	const rss = `
    <rss xmlns:blogChannel="${blogUrl}" version="2.0">
      <channel>
        <title>SoloFoundersHub Blog</title>
        <link>${blogUrl}</link>
        <description>The SoloFoundersHub Blog</description>
        <language>en-us</language>
        <generator>Kody the Koala</generator>
        <ttl>40</ttl>
        ${posts
					.map((post) =>
						`
            <item>
              <title>${cdata(post.frontmatter.title ?? 'Untitled Post')}</title>
              <description>${cdata(
								post.frontmatter.description ?? 'This post is... indescribable',
							)}</description>
              <pubDate>${formatDate(
								post.frontmatter.date ?? new Date(),
								'yyyy-MM-ii',
							)}</pubDate>
              <link>${blogUrl}/${post.slug}</link>
              <guid>${blogUrl}/${post.slug}</guid>
            </item>
          `.trim(),
					)
					.join('\n')}
      </channel>
    </rss>
  `.trim()

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Content-Length': String(Buffer.byteLength(rss)),
		},
	})
}

function cdata(s: string) {
	return `<![CDATA[${s}]]>`
}
