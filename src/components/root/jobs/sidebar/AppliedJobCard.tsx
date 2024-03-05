import { Job } from '@/constants/JobList'

const AppliedJobCard = ({ job }: { job: Job }) => {
  return (
    <div className="border border-gray_color rounded-md p-1.5 bg-gray_color/30 hover:bg-gray_color/60  ">
      <div className="text-center font-semibold mb-2 text-white/80">
        {job.name}
      </div>
      <div>
        <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
          <span className="font-bold text-base text-primary_color">
            Company Name:
          </span>
          <span className="text-sm text-gray-400 font-semibold">
            {job.companyName}
          </span>
        </div>
        <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
          <span className="font-bold text-base text-primary_color">
            Location:
          </span>
          <span className="text-sm text-gray-400 font-semibold">
            {job.location}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AppliedJobCard
