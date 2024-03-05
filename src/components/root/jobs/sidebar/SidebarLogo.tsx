'use client'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useSidebarToggle from '@/hooks/useSidebarToggle'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'

const SidebarLogo = () => {
  const { currentUser } = useLoginModal()
  const { toggleSidebar, isOpen } = useSidebarToggle()

  return (
    <div className="flex w-full justify-between items-start">
      <button
        onClick={() => toggleSidebar()}
        className="cursor-pointer border border-gray_color rounded-md bg-gray_color/60 p-0.5 hover:bg-gray_color/80 transition-all"
      >
        <MenuIcon size={22} />
      </button>
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
