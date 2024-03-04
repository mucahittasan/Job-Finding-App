'use client'

import { applieJobUrl, getJobById } from '@/constants/urls'
import useJobDetailModal from '@/hooks/modals/jobDetailModal'
import useCustomDateFormatter from '@/hooks/useFormatDate'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '.'

const JobDetailModal = () => {
  const { currentJob, isOpen, onClose } = useJobDetailModal()
  const router = useRouter()
  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!currentJob) {
      throw new Error('Current job is null')
    }
    setSubmitIsLoading(true)
    try {
      const response = await axios.post(applieJobUrl(currentJob), currentJob, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      toast.success(response.data.message)
      onClose()
      return response.data
    } catch (error: any) {
      toast.error(error.message)
      setSubmitIsLoading(false)
    } finally {
      setSubmitIsLoading(false)
      window.location.reload()
    }
  }

  const {
    data: job,
    mutate: refetch,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      if (!currentJob) {
        throw new Error('Current job is null')
      }

      const response = await axios.get(getJobById(currentJob), {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      return response.data
    },
  })

  useEffect(() => {
    refetch()
  }, [currentJob, isOpen])

  const formattedDate = useCustomDateFormatter(job?.createdAt) || ''

  const bodyContent = isPending ? (
    <Loader2 className="mx-auto h-8 w-8 animate-spin text-dark" />
  ) : (
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
        <div className="flex gap-2 flex-wrap mb-2">
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
      secondaryAction={onClose}
      isLoading={submitIsLoading}
      secondaryActionLabel="Cancel"
    />
  )
}

export default JobDetailModal
