'use client'
import Button from '@/components/ui/Button'
import { useCallback, useEffect, useState } from 'react'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  isLoading?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])
  const handleClose = useCallback(() => {
    if (isLoading) {
      return
    }

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [isLoading, onClose])

  const handleSubmit = useCallback(() => {
    if (isLoading) {
      return
    }

    onSubmit()
  }, [onSubmit, isLoading])

  if (!isOpen) {
    return null
  }
  return (
    <div
      onClick={() => handleClose()}
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-dark/70"
    >
      <div className="relative md:w-[400px] min-[550px]:w-[70%] w-[95%] mx-auto h-auto">
        {/* CONTENT */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`translate duration-300 h-full ${
            showModal ? 'scale-[1]' : 'scale-[0]'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="px-6 pb-6 pt-8 translate h-full lg:h-auto md:h-auto border-0 rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* HEADER */}
            <div className=" flex items-center rounded-t justify-center relative mb-6">
              <h2 className="font-semibold md:text-3xl text-2xl text-dark">
                {title}
              </h2>
            </div>
            {/* BODY */}
            <div className="relative flex-auto py-6">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4 w-full">
                <Button
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  variant="secondary"
                  className="w-full rounded-[20px] !text-sm bg-dark hover:bg-dark/80"
                >
                  {actionLabel}
                </Button>
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
