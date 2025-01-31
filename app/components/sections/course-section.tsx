import { images } from '#app/images.tsx'
import { CourseCard } from '../course-card.tsx'
import { Grid } from '../grid.tsx'
import { HeaderSection } from './header-section.tsx'

function CourseSection() {
	return (
		<>
			<HeaderSection
				title="Are you ready to level up?"
				subTitle="Checkout some of my courses"
				cta="See all courses"
				ctaUrl="/courses"
				className="mb-16"
			/>
			<Grid>
				<div className="col-span-full">
					<CourseCard
						title="Course one"
						description="Occaecat eiusmod Loremx."
						// this swap is intentional. The dark looks nicer on light and vice versa
						darkImageBuilder={images.courseEpicWebLight}
						lightImageBuilder={images.courseEpicWebDark}
						courseUrl="https://www.epicweb.dev"
					/>
				</div>
				<div className="col-span-full lg:col-span-6">
					<CourseCard
						title="Course two"
						description="Occaecat eiusmod Loremx."
						imageBuilder={images.courseEpicReact}
						courseUrl="https://epicreact.dev"
					/>
				</div>

				<div className="col-span-full mt-12 lg:col-span-6 lg:mt-0">
					<CourseCard
						title="Course three"
						description="Occaecat eiusmod Loremx."
						imageBuilder={images.courseTestingJS}
						courseUrl="https://testingjavascript.com"
					/>
				</div>
			</Grid>
		</>
	)
}

export { CourseSection }
