'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { MotionDiv } from '@/utils/motions/Motions'
import { jobListVariants } from '@/utils/motions/Variant'

import { Job } from '@/constants/JobList'
import { getAllJobs } from '@/constants/urls'

import useFilter from '@/hooks/useFilter'

import JobItem from './JobItem'

const JobsList = () => {
  const { orderByDirection, orderByField } = useFilter()

  const fetchJobs = async () => {
    if (
      orderByDirection === '' ||
      (orderByDirection === undefined && orderByField === '') ||
      orderByField === undefined
    ) {
      const response = await fetch(
        getAllJobs({
          page: 1,
          perPage: 10,
        }),
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error('Network error')
      }

      return response.json()
    } else {
      const response = await fetch(
        getAllJobs({
          page: 1,
          perPage: 10,
          orderByField: orderByDirection,
          orderByDirection: orderByField,
        }),
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      )
      if (!response.ok) {
        toast.error('Network error')
      }

      return response.json()
    }
  }

  const {
    data: jobs,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [orderByField, orderByDirection])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <MotionDiv
      variants={jobListVariants}
      initial="hidden"
      animate="visible"
      className="max-h-[calc(100vh-185px)] h-full overflow-y-auto px-12 py-6 flex flex-col "
    >
      {jobs?.data.map((job: Job, i: number) => (
        <JobItem
          key={i}
          id={job.id}
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
