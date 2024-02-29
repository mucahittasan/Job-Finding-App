import { jobs } from '@/constants/JobList'
import { MotionDiv } from '@/utils/motions/Motions'
import { jobListVariants } from '@/utils/motions/Variant'
import JobItem from './JobItem'

const JobsList = () => {
  return (
    <MotionDiv
      variants={jobListVariants}
      initial="hidden"
      animate="visible"
      className="max-h-[calc(100vh-185px)] h-full overflow-y-auto px-12 py-6 flex flex-col "
    >
      {jobs.map((job, i) => (
        <JobItem
          key={i}
          jobName={job.name}
          companyName={job.companyName}
          keywords={job.keywords}
          description={job.description}
          salary={job.salary}
          location={job.location}
        />
      ))}
    </MotionDiv>
  )
}

export default JobsList
