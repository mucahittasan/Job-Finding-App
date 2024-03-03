'use client'

import useJobDetailModal from '@/hooks/modals/jobDetailModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Modal from '.'
import { getJobById } from '../../../constants/urls'
import useCustomDateFormatter from '../../../hooks/useFormatDate'

const JobDetailModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { currentJob, setCurrentJob, isOpen, onClose } = useJobDetailModal()

  const fetchJobById = async () => {
    if (!currentJob) {
      throw new Error('Current job is null')
    }

    const response = await axios.get(getJobById(currentJob), {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    })
    return response.data
  }

  const { data: job, refetch } = useQuery({
    queryKey: ['jobDetail'],
    queryFn: fetchJobById,
    enabled: false,
  })
  useEffect(() => {
    refetch()
  }, [currentJob, isOpen])

  const formattedDate = useCustomDateFormatter(job?.createdAt) || ''

  const handleSubmit = () => {}

  const bodyContent = (
    <div className="text-dark pb-2 flex flex-col gap-y-2">
      <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
        <span className="font-bold text-lg text-primary_color">
          Company Name:
        </span>
        <span className="text-base text-gray_color font-semibold">
          {job?.companyName}
        </span>
      </div>
      <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
        <span className="font-bold text-lg text-primary_color">Job Name:</span>
        <span className="text-base text-gray_color font-semibold">
          {job?.name}
        </span>
      </div>
      <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
        <span className="font-bold text-lg text-primary_color">
          Created At:
        </span>
        <span className="text-base text-gray_color font-semibold">
          {formattedDate}
        </span>
      </div>
      <div className="flex sm:flex-row flex-col gap-x-2 sm:items-center items-start">
        <span className="font-bold text-lg text-primary_color">Location: </span>
        <span className="text-base text-gray_color font-semibold">
          {job?.location}
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="font-bold text-lg text-primary_color">Keywords: </span>
        <div className="flex gap-x-2 flex-wrap mb-2">
          {job?.keywords.map((keyword: string, i: number) => (
            <div
              key={i}
              className="bg-secondary_color/80 px-3 py-1 rounded-md text-xs text-white"
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className="font-bold text-lg text-primary_color">Salary: </span>
        <span className="text-base text-gray_color font-semibold">
          {job?.salary} $
        </span>
      </div>
      <div>
        <span className="font-bold text-lg text-primary_color">
          Job Description
        </span>
        <p className="text-sm font-medium text-gray_color border-2 border-gray_color/20 p-2 rounded-lg max-h-[100px] overflow-y-auto">
          {job?.description}
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      onClose={onClose}
      actionLabel="Apply"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="Apply Job"
      body={bodyContent}
      isLoading={isLoading}
      secondaryAction={onClose}
      secondaryActionLabel="Cancel"
    />
  )
}

export default JobDetailModal
