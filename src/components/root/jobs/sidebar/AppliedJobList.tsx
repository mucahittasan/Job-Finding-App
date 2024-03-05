'use client'

import { Job } from '@/constants/JobList'
import { getJobById } from '@/constants/urls'
import useLoginModal from '@/hooks/modals/useLoginModal'
import useSidebarToggle from '@/hooks/useSidebarToggle'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AppliedJobCard from './AppliedJobCard'

const AppliedJobList = () => {
  const { currentUser } = useLoginModal()
  const { isOpen } = useSidebarToggle()

  const [appliedJobsDetails, setAppliedJobsDetails] = useState<Job[]>([])

  useEffect(() => {
    const fetchAppliedJobsDetails = async () => {
      if (currentUser && currentUser.appliedJobs.length > 0) {
        let jobsDetails = []

        for (const jobId of currentUser.appliedJobs) {
          try {
            const response = await axios.get(getJobById(jobId), {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
              },
            })

            jobsDetails.push(response.data)
          } catch (error: any) {
            toast.error(error)
          }
        }

        setAppliedJobsDetails(jobsDetails)
      }
    }

    fetchAppliedJobsDetails()
  }, [currentUser])

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
