import { Briefcase } from 'lucide-react'
import { FC } from 'react'
import Button from '../../ui/Button'

interface JobItemProps {
  jobName: string
  companyName: string
  keywords: string[]
  description: string
  salary: number
  location: string
}

const JobItem: FC<JobItemProps> = ({
  jobName,
  companyName,
  keywords,
  description,
  salary,
  location,
}) => {
  const firstThreeKeywords = () => {
    return keywords.length > 0 ? keywords.slice(0, 3) : []
  }

  const firstThree = firstThreeKeywords()

  return (
    <div className="flex justify-between border-b border-b-gray_color/50 py-4">
      <div className="flex gap-4">
        <Briefcase size={50} />
        <div className="flex flex-col items-start gap-y-4 ">
          <div className="flex items-center gap-x-2 text-2xl font-bold">
            <h3>{companyName}</h3>
            <span>-</span>
            <h3 className="text-zinc-400">{jobName}</h3>
          </div>
          <p className="text-sm font-medium text-gray-400 max-w-[80%]">
            {description}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-primary_color font-semibold">Location:</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-primary_color font-semibold">Salary:</span>
            <span>{salary} $</span>
          </div>

          <div className="flex items-center gap-x-4 my-4">
            {firstThree.map((keyword, i) => (
              <div
                key={i}
                className="bg-secondary_color/80 px-3 py-1 rounded-md text-sm"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 items-start">
        <Button className="w-full">Detail</Button>
        <Button className="w-full !bg-white/20 text-white hover:!bg-white/30">
          Withdraw
        </Button>
      </div>
    </div>
  )
}

export default JobItem
