'use client'

import { Job } from '@/constants/JobList'
import { getJobById } from '@/constants/urls'
import useLoginModal from '@/hooks/modals/useLoginModal'
import useSidebarToggle from '@/hooks/useSidebarToggle'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AppliedJobCard from './AppliedJobCard'

const AppliedJobList = () => {
  const { currentUser } = useLoginModal()
  const { isOpen } = useSidebarToggle()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [appliedJobsDetails, setAppliedJobsDetails] = useState<Job[]>([])

  useEffect(() => {
    const fetchAppliedJobsDetails = async () => {
      if (currentUser && currentUser.appliedJobs.length > 0) {
        let jobsDetails = []

        for (const jobId of currentUser.appliedJobs) {
          try {
            setIsLoading(true)

            const response = await axios.get(getJobById(jobId), {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
              },
            })

            jobsDetails.push(response.data)
          } catch (error: any) {
            toast.error(error)
            setIsLoading(false)
          } finally {
            setIsLoading(false)
          }
        }
        setAppliedJobsDetails(jobsDetails)
      } else {
        setAppliedJobsDetails([])
      }
    }

    fetchAppliedJobsDetails()
  }, [currentUser])

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center ${
          !isOpen
            ? 'w-0 opacity-0  -z-30'
            : 'w-auto opacity-[1] flex flex-col items-center'
        }`}
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  if (appliedJobsDetails.length === 0) {
    return (
      <div
        className={`${
          !isOpen
            ? 'w-0 opacity-0  -z-30'
            : 'w-auto opacity-[1] flex flex-col items-center'
        }`}
      >
        <div className="font-bold">There is no any applied job</div>
        <p className="text-gray_color text-sm font-medium">
          You can apply for a job to start a new career
        </p>
      </div>
    )
  }

  return (
    <div
      className={` transition-all duration-300 lg:max-w-[100%] sm:max-w-[90%] max-w-[98%] mx-auto max-h-[calc(100vh-254px)] overflow-y-auto px-3 ${
        !isOpen ? 'w-0 opacity-0  -z-30' : 'w-auto opacity-[1]'
      }`}
    >
      <ul className="flex flex-col gap-y-4">
        {appliedJobsDetails.map((job, index) => (
          <li key={index}>
            <AppliedJobCard job={job} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AppliedJobList
