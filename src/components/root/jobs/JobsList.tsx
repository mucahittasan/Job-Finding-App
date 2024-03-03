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

import { GenerateQuery } from '../../../utils/generateQuery'
import JobItem from './JobItem'
import JobsPagination from './JobsPagination'

const JobsList = () => {
  const { orderByDirection, orderByField, searchQuery, showCount, pageCount } =
    useFilter()

  const fetchJobs = async () => {
    const baseQuery = {
      page: pageCount,
      perPage: showCount,
      orderByField: orderByDirection,
      orderByDirection: orderByField,
    }

    const searchQueryParams = searchQuery
      ? [
          {
            key: 'search',
            value: {
              field: 'name',
              query: searchQuery,
            },
          },
        ]
      : []

    const response = await fetch(
      `${getAllJobs(baseQuery)}&${GenerateQuery(...searchQueryParams)}`,
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
  }, [orderByField, orderByDirection, searchQuery, showCount, pageCount])
  console.log(jobs?.data?.length)
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
      className="max-h-[calc(100vh-230px)] h-full overflow-y-auto px-12 py-6 flex flex-col "
    >
      {jobs?.data?.length === 0 ? (
        <div>There is no any data!</div>
      ) : (
        <>
          {jobs?.data?.map((job: Job, i: number) => (
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
          <JobsPagination />
        </>
      )}
    </MotionDiv>
  )
}
export default JobsList
