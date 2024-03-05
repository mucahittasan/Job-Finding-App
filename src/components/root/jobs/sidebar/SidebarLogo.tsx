'use client'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useSidebarToggle from '@/hooks/useSidebarToggle'
import Image from 'next/image'
import ToggleSidebarButton from './ToggleSidebarButton'

const SidebarLogo = () => {
  const { currentUser } = useLoginModal()
  const { isOpen } = useSidebarToggle()

  return (
    <div className="flex w-full justify-between items-start">
      <div>
        <ToggleSidebarButton />
      </div>
      <div
        className={`flex flex-col items-center gap-y-4  ${
          !isOpen ? 'w-0 opacity-0 -z-30' : 'w-auto opacity-[1]'
        }`}
      >
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
      <div></div>
    </div>
  )
}

export default SidebarLogo
