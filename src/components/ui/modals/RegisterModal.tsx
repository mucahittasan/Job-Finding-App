'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { RegisterSchema } from '@/schemas'
import Input from '../Input'
import Modal from './index'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useRegisterModal from '@/hooks/modals/useRegisterModal'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { registerUser } from '../../../actions/user'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
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

  const { mutate: registerMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await registerUser({
        email: data.email,
        password: data.password,
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('Register success!')
      registerModal.onClose()
      loginModal.onOpen()
    },
    onError: (error: AxiosError) => {
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred during login.')
      }
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    registerMutate({
      email: data.email as string,
      password: data.password as string,
    })
    reset()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={false}
        register={register}
        errors={errors}
        required
        placeholder="test@gmail.com"
        errorMessage={getErrorMessage('email')}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={false}
        register={register}
        errors={errors}
        required
        placeholder="*******"
        errorMessage={getErrorMessage('password')}
      />
    </div>
  )

  const footerContent = (
    <footer className="text-center ">
      <p className="text-xs font-medium text-dark">
        Already have an account?{' '}
        <button
          onClick={() => {
            registerModal.onClose()
            loginModal.onOpen()
          }}
          className="text-primary_color font-semibold hover:underline"
        >
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
      body={bodyContent}
      footer={footerContent}
      isLoading={isPending}
    />
  )
}

export default RegisterModal
