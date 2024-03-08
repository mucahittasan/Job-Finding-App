'use client'

import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { MotionDiv } from '@/utils/motions/Motions'
import { jobListVariants } from '@/utils/motions/Variant'

import { Job } from '@/constants/JobList'

import useFilter from '@/hooks/useFilter'

import useLoginModal from '@/hooks/modals/useLoginModal'
import { Loader2 } from 'lucide-react'
import { fetchJobs } from '../../../actions/jobs'
import Button from '../../ui/Button'
import JobItem from './JobItem'
import JobsPagination from './JobsPagination'

const JobsList = () => {
  const { currentUser } = useLoginModal()

  const {
    orderByDirection,
    orderByField,
    searchQuery,
    showCount,
    pageCount,
    setTotalShowCount,
  } = useFilter()

  const getJobs = async () => {
    return await fetchJobs(
      pageCount,
      showCount,
      orderByDirection,
      orderByField,
      searchQuery,
      Cookies.get('accessToken'),
    )
  }

  const {
    data: jobs,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    enabled: false,
  })

  useEffect(() => {
    refetch()
  }, [
    orderByField,
    orderByDirection,
    searchQuery,
    showCount,
    pageCount,
    currentUser,
  ])

  useEffect(() => {
    setTotalShowCount(jobs?.meta?.total || 0)
  }, [jobs])

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-173px)]  flex justify-center items-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <MotionDiv
      variants={jobListVariants}
      initial="hidden"
      animate="visible"
      className="lg:max-h-[calc(100vh-173px)] md:max-h-[calc(100vh-201px)] max-h-[calc(100vh-255px)] h-full overflow-y-auto md:px-12 px-4 py-6 flex flex-col overflow-x-hidden "
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
              isApplied={
                currentUser?.appliedJobs?.includes(job.id as never) || false
              }
            />
          ))}
          {jobs?.meta?.total >= 10 && <JobsPagination />}
        </>
      )}
    </MotionDiv>
  )
}
export default JobsList
