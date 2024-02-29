'use client'

import Link from 'next/link'

import Button from '@/components/ui/Button'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useRegisterModal from '@/hooks/modals/useRegisterModal'

const HeaderContent = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  return (
    <header className="flex px-4 h-20 items-center justify-between content">
      <Link
        href={'/'}
        className="md:text-3xl text-2xl font-bold"
      >
        ACME
      </Link>
      <div className="flex gap-x-4">
        <Button
          onClick={() => {
            loginModal.onOpen()
          }}
          variant={'primary'}
          className="font-semibold md:text-base text-xs md:h-10 h-8 transition duration-200 hover:scale-[1.05] w-[98px]"
        >
          Login
        </Button>
        <Button
          onClick={() => {
            registerModal.onOpen()
          }}
          variant={'secondary'}
          className="font-semibold md:text-base text-xs md:h-10 h-8 transition duration-200 hover:scale-[1.05] w-[98px]"
        >
          Sign Up
        </Button>
      </div>
    </header>
  )
}

export default HeaderContent
