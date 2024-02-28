'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/hooks/modals/useRegisterModal'
import { RegisterSchema } from '@/schemas'
import { useState } from 'react'
import Modal from './index'

const LoginModal = () => {
  const registerModal = useRegisterModal()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const getErrorMessage = (fieldName: string) => {
    return errors[fieldName]?.message
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    setIsLoading(true)

    // Register form
  }

  const footerContent = (
    <footer className="text-center ">
      <p className="text-xs font-medium">
        Already have an account?{' '}
        <button className="text-primary_color font-semibold hover:underline">
          Sign in.
        </button>{' '}
      </p>
    </footer>
  )

  return (
    <Modal
      onClose={registerModal.onClose}
      actionLabel="Register"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={registerModal.isOpen}
      title="Become a member!"
      footer={footerContent}
      isLoading={isLoading}
    />
  )
}

export default LoginModal
