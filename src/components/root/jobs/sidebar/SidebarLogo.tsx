'use client'

import useLoginModal from '@/hooks/modals/useLoginModal'
import Image from 'next/image'

const SidebarLogo = () => {
  const { currentUser } = useLoginModal()

  return (
    <div className="flex w-full justify-center items-center flex-col gap-y-4">
      <Image
        src={currentUser?.profileImage ?? ''}
        alt="Avatar"
        width={70}
        height={70}
        className="rounded-full aspect-square object-cover"
      />
      <div className="text-gray_color font-semibold text-sm">
        {currentUser?.email.split('@')[0]}
      </div>
    </div>
  )
}

export default SidebarLogo
