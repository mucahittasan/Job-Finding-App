// Utils
import { MotionSection } from '@/utils/motions/Motions'
import { containerVariants } from '@/utils/motions/Variant'

const HomeContent = () => {
  return (
    <MotionSection
      className="content text-center h-[calc(100vh-80px)] flex px-4 flex-col justify-center max-w-4xl mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="lg:text-8xl md:text-7xl sm:text-5xl xs:text-4xl text-3xl font-bold">
        Embark on a New <span className="text-primary_color">Career</span>{' '}
        Journey{' '}
      </h2>
      <p className="md:text-base text-sm mt-16 mx-auto max-w-[550px] text-gray_color">
        Strengthen your career, explore the latest job opportunities, and shape
        your future.
      </p>
    </MotionSection>
  )
}

export default HomeContent
