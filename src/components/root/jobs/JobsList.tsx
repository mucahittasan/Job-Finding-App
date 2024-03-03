'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { GenerateQuery } from '@/utils/generateQuery'
import { MotionDiv } from '@/utils/motions/Motions'
import { jobListVariants } from '@/utils/motions/Variant'

import { Job } from '@/constants/JobList'
import { getAllJobs } from '@/constants/urls'

import useFilter from '@/hooks/useFilter'

import Button from '../../ui/Button'
import JobItem from './JobItem'
import JobsPagination from './JobsPagination'

const JobsList = () => {
  const {
    orderByDirection,
    orderByField,
    searchQuery,
    showCount,
    pageCount,
    setTotalShowCount,
  } = useFilter()

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

  useEffect(() => {
    setTotalShowCount(jobs?.meta?.total)
  }, [jobs])

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
      className="max-h-[calc(100vh-173px)] h-full overflow-y-auto px-12 py-6 flex flex-col "
    >
      {jobs?.data?.length === 0 ? (
        <div className="flex gap-x-4 items-center">
          <span>There is no any data!</span>
          <Button onClick={() => window.location.reload()}>
            Refresh the page
          </Button>
        </div>
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
          {jobs?.meta?.total >= 10 && <JobsPagination />}
        </>
      )}
    </MotionDiv>
  )
}
export default JobsList
