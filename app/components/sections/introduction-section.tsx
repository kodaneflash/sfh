import { Link, useSearchParams } from '@remix-run/react'
import { getImgProps, images } from '#app/images.tsx'
import { ArrowLink } from '../arrow-button.tsx'
import {
	FullScreenYouTubeEmbed,
	LiteYouTubeEmbed,
} from '../fullscreen-yt-embed.tsx'
import { Grid } from '../grid.tsx'
import { H2, H3 } from '../typography.tsx'

function IntroductionSection() {
	const [searchParams] = useSearchParams()
	return (
		<Grid>
			<div className="col-span-full lg:col-span-4">
				<FullScreenYouTubeEmbed
					autoplay={searchParams.has('autoplay')}
					img={
						<img
							{...getImgProps(images.getToKnowKentVideoThumbnail, {
								className: 'rounded-lg object-cover w-full',
								widths: [256, 550, 700, 900, 1300, 1800],
								sizes: [
									'(max-width: 320px) 256px',
									'(min-width: 321px) and (max-width: 1023px) 80vw',
									'(min-width: 1024px) 410px',
									'850px',
								],
							})}
						/>
					}
					ytLiteEmbed={
						<LiteYouTubeEmbed
							id="a7VxBwLGcDE"
							announce="Watch"
							title="Get to know Kent C. Dodds"
							// We don't show the poster, so we use the lowest-res version
							poster="default"
							params={new URLSearchParams({
								color: 'white',
								playsinline: '0',
								rel: '0',
							}).toString()}
						/>
					}
				/>
				<p className="text-secondary text-xl">{`Introduction video (2:13)`}</p>
				<Link
					prefetch="intent"
					className="underlined"
					to="/about?autoplay"
				>{`or, watch the full video here (8:05)`}</Link>
			</div>
			<div className="col-span-full mt-12 lg:col-span-6 lg:col-start-6 lg:mt-0">
				<H2 id="intro">
					{`There is an emerging community of solo entrepreneurs making money online with successful online businesses.`}
				</H2>
				<H3 variant="secondary" as="p" className="mt-12">
					{`
            SoloFoundersHub is a community of solo entrepreneurs to exchange ideas, share experiences and network. Our platform has comprehensive courses created by successful founders, blogs packed with vital information to enhance your skills and knowledge, and specially designed tools to help you create and scale your online business.
          `}
				</H3>
				<ArrowLink
					to="/about"
					direction="right"
					className="mt-20"
					prefetch="intent"
				>
					Learn more about SoloFoundersHub
				</ArrowLink>
			</div>
		</Grid>
	)
}

export { IntroductionSection }
