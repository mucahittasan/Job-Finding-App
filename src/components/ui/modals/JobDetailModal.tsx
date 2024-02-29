'use client'

import useJobDetailModal from '@/hooks/modals/jobDetailModal'
import { useState } from 'react'
import Modal from '.'

const JobDetailModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const jobDetailModal = useJobDetailModal()

  const handleSubmit = () => {}

  const bodyContent = <div>Body</div>

  return (
    <Modal
      onClose={jobDetailModal.onClose}
      actionLabel="Apply"
      onSubmit={handleSubmit}
      isOpen={jobDetailModal.isOpen}
      title="Apply Job"
      body={bodyContent}
      isLoading={isLoading}
    />
  )
}

export default JobDetailModal
