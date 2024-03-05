'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { RegisterSchema } from '@/schemas'
import Cookies from 'js-cookie'
import Input from '../Input'
import Modal from './index'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useRegisterModal from '@/hooks/modals/useRegisterModal'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { loginUser } from '../../../actions/user'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

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

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      })
      if (response.accessToken) {
        Cookies.set('accessToken', response.accessToken)
        return response
      }
    },
    onSuccess: () => {
      loginModal.onClose()
      toast.success('Login success!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
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
    loginMutate({
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
        Don't you have an account?{' '}
        <button
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
          }}
          className="text-primary_color font-semibold hover:underline"
        >
          Sign up.
        </button>{' '}
      </p>
    </footer>
  )

  return (
    <Modal
      onClose={loginModal.onClose}
      actionLabel="Login"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      title="Welcome Back!"
      body={bodyContent}
      footer={footerContent}
      isLoading={isPending}
    />
  )
}

export default LoginModal
