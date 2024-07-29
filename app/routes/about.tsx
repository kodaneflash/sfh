import {
	json,
	type HeadersFunction,
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { ArrowLink } from '#app/components/arrow-button.tsx'
import { FeatureCard } from '#app/components/feature-card.tsx'
import {
	FullScreenYouTubeEmbed,
	LiteYouTubeEmbed,
	links as youTubeEmbedLinks,
} from '#app/components/fullscreen-yt-embed.tsx'
import { Grid } from '#app/components/grid.tsx'
import {
	AwardIcon,
	BadgeIcon,
	BookIcon,
	FastForwardIcon,
	MugIcon,
	UsersIcon,
} from '#app/components/icons.tsx'
import { BlogSection } from '#app/components/sections/blog-section.tsx'
import { HeaderSection } from '#app/components/sections/header-section.tsx'
import { HeroSection } from '#app/components/sections/hero-section.tsx'
import { H2, H3, H6, Paragraph } from '#app/components/typography.tsx'
import {
	getImgProps,
	getSocialImageWithPreTitle,
	images,
} from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { getBlogRecommendations } from '#app/utils/blog.server.ts'
import { shuffle } from '#app/utils/cjs/lodash.ts'
import {
	getDisplayUrl,
	getUrl,
	reuseUsefulLoaderHeaders,
} from '#app/utils/misc.tsx'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getTalksAndTags } from '#app/utils/talks.server.ts'
import { getServerTimeHeader } from '#app/utils/timing.server.ts'
import { useRootData } from '#app/utils/use-root-data.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const timings = {}
	const { talks } = await getTalksAndTags({ request, timings })

	return json(
		{
			blogRecommendations: await getBlogRecommendations({ request, timings }),
			// they're ordered by date, so we'll grab two random of the first 10.
			talkRecommendations: shuffle(talks.slice(0, 14)).slice(0, 4),
		},
		{
			headers: {
				'Cache-Control': 'private, max-age=3600',
				Vary: 'Cookie',
				'Server-Timing': getServerTimeHeader(timings),
			},
		},
	)
}

export const headers: HeadersFunction = reuseUsefulLoaderHeaders

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
	matches,
}) => {
	const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
	return getSocialMetas({
		title: 'About SoloFoundersHub',
		description: 'Get to know SoloFoundersHub',
		keywords: 'about, solo, solo founders, solo founders hub',
		url: getUrl(requestInfo),
		image: getSocialImageWithPreTitle({
			url: getDisplayUrl(requestInfo),
			featuredImage: 'kent/video-stills/snowboard-butter',
			preTitle: 'Get to know',
			title: `Kent C. Dodds`,
		}),
	})
}

export const links: LinksFunction = () => {
	return youTubeEmbedLinks()
}

function AboutIndex() {
	const { blogRecommendations, talkRecommendations } =
		useLoaderData<typeof loader>()
	const [searchParams] = useSearchParams()
	const { requestInfo } = useRootData()
	const permalinkAutoplay = `${requestInfo.origin}/about?autoplay`

	return (
		<>
			<HeroSection
				title="Hi, I'm James Archer. I've founded 8 software companies, with 6 being acquired, including one sold for $5.6 million."
				subtitle="I founded SoloFoundersHub to provide aspiring entrepeneurs with a community that shares the same goal, offering comprehensive courses created by successful founders, insightful blogs, software and tools designed to help you grow and scale, and more."
				imageBuilder={images.snowboard}
				arrowUrl="#about-me"
				arrowLabel="Get to know more about SoloFoundersHub" 
			/>

			<Grid as="main" className="mb-24 mt-16 lg:mb-48">
				<div className="col-span-full">
					<FullScreenYouTubeEmbed
						autoplay={searchParams.has('autoplay')}
						img={
							<img
								id="about-me"
								{...getImgProps(images.getToKnowKentVideoThumbnail, {
									className: 'rounded-lg object-cover w-full',
									widths: [280, 560, 840, 1100, 1300, 2600, 3900],
									sizes: ['(min-width:1620px) 1280px', '80vw'],
								})}
							/>
						}
						ytLiteEmbed={
							<LiteYouTubeEmbed
								id="sxcRxZpUJWo"
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
					<p className="text-xl text-slate-500">{`Get to know me in this full introduction video (8:05)`}</p>
					<a
						className="underlined"
						target="_blank"
						rel="noreferrer noopener"
						href={`https://twitter.com/intent/tweet?${new URLSearchParams({
							url: permalinkAutoplay,
							text: `I just watched @kentcdodds' life flash before my eyes.`,
						})}`}
					>
						{`Share this video.`}
					</a>
				</div>
			</Grid>

			<Grid className="mb-24 mt-16 lg:mb-48">
				<div className="col-span-full mb-12 lg:col-span-4 lg:mb-0">
					<H6 as="h2">{`How I got where we are now.`}</H6>
				</div>
				<div className="col-span-full mb-8 lg:col-span-8 lg:mb-20">
					<H2 as="p" className="mb-8">
						{`Fugiat tempor laborum nulla culpa non occaecat esse irure id veniam ullamco.`}
					</H2>
					<H2 className="mb-12" variant="secondary" as="p">
						{`
              Adipisicing in deserunt commodo sunt. Exercitation labore qui id dolor. Eu exercitation reprehenderit anim commodo qui sit amet.
            `}
					</H2>

					<ArrowLink className="mb-16" to="/blog/2010s-decade-in-review">
						{`Read my full story`}
					</ArrowLink>

					<div className="w-full lg:pr-12">
						<img
							{...getImgProps(images.kentWorkingInNature, {
								className: 'w-full rounded-lg object-cover',
								widths: [512, 840, 1024, 1680, 2520],
								sizes: [
									'(max-width: 1023px) 80vw',
									'(min-width: 1024px) and (max-width: 1620px) 50vw',
									'800px',
								],
							})}
						/>
					</div>
				</div>

				<Paragraph className="lg:mb:0 col-span-full mb-4 lg:col-span-4 lg:col-start-5 lg:mr-12">
					{`
            Mollit pariatur voluptate sit non occaecat fugiat adipisicing amet occaecat mollit pariatur nisi. Commodo laborum aliquip eu proident sint minim culpa commodo voluptate duis aliqua. Do quis in cupidatat cupidatat occaecat laboris culpa sint officia eiusmod eiusmod ullamco laboris proident consequat. Sit tempor elit voluptate irure id dolor esse.
          `}
				</Paragraph>
				<Paragraph className="col-span-full lg:col-span-4 lg:col-start-9 lg:mr-12">
					{`
            Do adipisicing anim non cupidatat enim elit excepteur Lorem Lorem minim occaecat. Mollit laborum Lorem ullamco nisi dolore consequat veniam reprehenderit excepteur minim dolore excepteur sit. Et aliqua occaecat quis excepteur sunt anim. Commodo nulla adipisicing reprehenderit. Quis dolore ad quis laboris duis elit aliqua ea.
          `}
				</Paragraph>
			</Grid>

			<Grid className="mb-24 lg:mb-64">
				<div className="col-span-full lg:col-span-6 lg:col-start-7">
					<div className="mb-12 lg:mb-0">
						<img
							{...getImgProps(images.happySnowboarder, {
								className: 'rounded-lg object-cover',
								widths: [512, 650, 840, 1024, 1300, 1680, 2000, 2520],
								sizes: [
									'(max-width: 1023px) 80vw',
									'(min-width: 1024px) and (max-width: 1620px) 40vw',
									'650px',
								],
								transformations: {
									gravity: 'faces',
									resize: {
										type: 'fill',
										aspectRatio: '3:4',
									},
								},
							})}
						/>
					</div>
				</div>

				<div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-1">
					<H2 className="mb-10">Voslupur nostruillum cillum velit reprehenderit fugiat..</H2>

					<H6 as="h3" className="mb-4">
						{`commodo`}
					</H6>
					<Paragraph className="mb-12">
						{`
              Veniam reprehenderit mollit velit sint pariatur tempor. Reprehenderit non ea excepteur esse commodo et. Velit ex ea excepteur deserunt commodo elit et qui ad laboris eu cillum
            `}
					</Paragraph>
					<H6 as="h3" className="mb-4">
						{`veniam ex`}
					</H6>
					<Paragraph className="mb-12">
						{`
             Incididunt incididunt consectetur quis adipisicing magna tempor voluptate non commodo est anim est dolor enim ex. Ipsum velit laborum commodo consectetur aliquip non ea. Anim do nisi non proident. Pariatur adipisicing dolor dolore aliqua minim nisi mollit nulla qui dolor esse aliquip dolor enim. Mollit aliqua fugiat aliqua aliquip cillum mollit.
            `}
					</Paragraph>
					<H6 as="h3" className="mb-4">
						{`Nisi ut veniam eiusmod aute.`}
					</H6>
					<Paragraph className="mb-12">
						{`
              Irure commodo non Lorem ipsum dolore Lorem sunt in nulla in exercitation duis quis. Eu pariatur esse occaecat tempor in Lorem ipsum sunt aute velit amet commodo incididunt minim. Amet sint esse nostrud excepteur excepteur nulla deserunt Lorem. Sint voluptate duis et proident est tempor amet enim. Qui occaecat tempor non proident. Pariatur commodo aliqua ad minim voluptate culpa deserunt ullamco.
            `}
					</Paragraph>
				</div>
			</Grid>

			<HeaderSection
				className="mb-16"
				ctaUrl="/talks"
				cta="See all talks"
				title="I do talks all over the world."
				subTitle="Here are a couple recent ones."
			/>

			<Grid className="mb-24 gap-5 lg:mb-64">
				<div className="col-span-full mb-12 lg:mb-20">
					<img
						id="about-me"
						{...getImgProps(images.kentSpeakingAllThingsOpen, {
							className: 'rounded-lg object-cover',
							widths: [280, 560, 840, 1100, 1300, 2600, 3900],
							sizes: ['(min-width:1620px) 1280px', '80vw'],
						})}
					/>
				</div>
				{talkRecommendations.map((talk) => (
					<div key={talk.slug} className="col-span-full lg:col-span-6">
						<TalkCard
							tags={talk.tags}
							dateDisplay={talk.deliveries[0]?.dateDisplay}
							title={talk.title}
							talkUrl={`/talks/${talk.slug}`}
						/>
					</div>
				))}
			</Grid>

			<Grid className="mb-24 lg:mb-64">
				<div className="col-span-full lg:col-span-6 lg:col-start-1">
					<div className="mb-12 lg:mb-0">
						<img
							{...getImgProps(images.microphoneWithHands, {
								className: 'rounded-lg object-cover',
								widths: [512, 650, 840, 1024, 1300, 1680, 2000, 2520],
								sizes: [
									'(max-width: 1023px) 80vw',
									'(min-width: 1024px) and (max-width: 1620px) 40vw',
									'650px',
								],
								transformations: {
									resize: {
										type: 'fill',
										aspectRatio: '3:4',
									},
								},
							})}
						/>
					</div>
				</div>

				<div className="col-span-full lg:col-span-4 lg:col-start-8 lg:row-start-1">
					<H2 className="mb-10 lg:mt-24">
						{`I have had the privilege to do a lot of cool interviews and chats.`}
					</H2>
					<H2 variant="secondary" as="p" className="mb-14">
						{`Check out my appearances on podcasts, blog and other cool stuff.`}
					</H2>
					<ArrowLink to="/appearances">See all appearances</ArrowLink>
				</div>
			</Grid>

			<HeaderSection
				title="Here are some random fun facts."
				subTitle="Some unique things about me."
				className="mb-16"
			/>

			<Grid className="mb-24 lg:mb-64" rowGap>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I have 11 brothers and sisters"
						description="Yup! There are 6 boys and 6 girls in my family. I'm second to last. No twins. We all have the same mom and dad. Yes my parents are super heroes 🦸‍♀️ 🦸"
						icon={<UsersIcon size={48} />}
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I can still do a backflip"
						description="When I was a kid, I competed in various gymnastics events. As of 2021, I can still do a backflip 🤸‍♂️"
						icon={<AwardIcon size={48} />}
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I've never had a sip of alcohol or coffee"
						description="It's a religious thing. That said, I do appreciate offers to go out for drinks! I'll just have a Hawaiian Punch thank you 🧃"
						icon={<MugIcon size={48} />}
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I'm an Eagle Scout"
						description="When I was 14, I got my friends and scout leaders to plant 15 trees in a new park in town for my eagle scout project 🦅"
						icon={<BadgeIcon size={48} />}
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I've written a novel"
						description="In 2018, I wanted to get good at telling stories, so I participated in National Novel Writing Month and wrote a 50k word novel in one month 📘"
						icon={<BookIcon size={48} />}
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<FeatureCard
						title="I listen to books and podcasts at 3x"
						description="I've worked my way up to 3x listening so I could listen to more. So far I've saved ~100 days of listening by doing this 🎧"
						icon={<FastForwardIcon size={48} />}
					/>
				</div>
			</Grid>

			<Grid className="mb-24 lg:mb-64">
				<div className="col-span-full mb-10 lg:col-span-6 lg:col-start-1 lg:mb-0">
					<img
						{...getImgProps(images.teslaY, {
							className: 'rounded-lg object-contain',
							widths: [420, 512, 840, 1260, 1024, 1680, 2520],
							sizes: [
								'(max-width: 1023px) 80vw',
								'(min-width: 1024px) and (max-width: 1620px) 40vw',
								'630px',
							],
						})}
					/>
				</div>

				<div className="col-span-full lg:col-span-4 lg:col-start-8 lg:row-start-1">
					<H2 className="mb-10">{`Curious to know the stuff I use?`}</H2>
					<H2 variant="secondary" as="p" className="mb-14">
						{`I keep a "uses" page updated with the stuff I use.`}
					</H2>
					<ArrowLink to="/uses">{`Check out the uses page`}</ArrowLink>
				</div>
			</Grid>

			<BlogSection
				articles={blogRecommendations}
				title="Have a look at my writing."
				description="These are the most popular."
			/>
		</>
	)
}

function TalkCard({
	tags,
	dateDisplay,
	title,
	talkUrl,
}: {
	tags: string[]
	dateDisplay?: string
	title: string
	talkUrl: string
}) {
	return (
		<div className="bg-secondary text-primary flex h-full w-full flex-col justify-between rounded-lg p-16 pt-20">
			<div>
				<div className="-mr-4 mb-12 flex flex-wrap">
					{tags.map((tag) => (
						<div
							className="text-primary mb-4 mr-4 rounded-full bg-gray-300 px-6 py-1 dark:bg-gray-700"
							key={tag}
						>
							{tag}
						</div>
					))}
				</div>

				<Paragraph as="span" className="mb-5">
					{dateDisplay ?? 'TBA'}
				</Paragraph>

				<H3 className="mb-5">{title}</H3>
			</div>
			<ArrowLink to={talkUrl}>
				<span className="hidden md:inline">Have a look at this talk</span>
				<span className="md:hidden">Read more</span>
			</ArrowLink>
		</div>
	)
}
export default AboutIndex
