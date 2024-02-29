import { jobs } from '@/constants/JobList'
import JobItem from './JobItem'

const JobsList = () => {
  return (
    <div className="max-h-[calc(100vh-185px)] h-full overflow-y-auto px-12 py-6 flex flex-col ">
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
    </div>
  )
}

export default JobsList
