'use client'

import useJobDetailModal from '@/hooks/modals/jobDetailModal'
import { useState } from 'react'
import Modal from '.'
import useCustomDateFormatter from '../../../hooks/modals/useFormatDate'

const JobDetailModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { currentJob, isOpen, onClose } = useJobDetailModal()

  const formattedDate = currentJob?.createdAt
    ? useCustomDateFormatter(currentJob?.createdAt)
    : ''

  const handleSubmit = () => {}

  const bodyContent = (
    <div className="text-dark pb-2 flex flex-col gap-y-2">
      <div className="flex gap-x-2 items-center">
        <span className="font-bold text-lg text-primary_color">
          Company Name:
        </span>
        <span className="text-base text-gray_color font-semibold">
          {currentJob?.companyName}
        </span>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className="font-bold text-lg text-primary_color">Job Name:</span>
        <span className="text-base text-gray_color font-semibold">
          {currentJob?.name}
        </span>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className="font-bold text-lg text-primary_color">
          Created At:
        </span>
        <span className="text-base text-gray_color font-semibold">
          {formattedDate}
        </span>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className="font-bold text-lg text-primary_color">Location: </span>
        <span className="text-base text-gray_color font-semibold">
          {currentJob?.location}
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="font-bold text-lg text-primary_color">Keywords: </span>
        <div className="flex gap-x-2 flex-wrap mb-2">
          {currentJob?.keywords.map((keyword, i) => (
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
          {currentJob?.salary} $
        </span>
      </div>
      <div>
        <span className="font-bold text-lg text-primary_color">
          Job Description
        </span>
        <p className="text-sm font-medium text-gray_color border-2 border-gray_color/20 p-2 rounded-lg max-h-[100px] overflow-y-auto">
          {currentJob?.description}
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
    />
  )
}

export default JobDetailModal
