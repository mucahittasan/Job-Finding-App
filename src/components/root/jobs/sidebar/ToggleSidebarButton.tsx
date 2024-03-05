'use client'

import useSidebarToggle from '@/hooks/useSidebarToggle'
import { MenuIcon } from 'lucide-react'

const ToggleSidebarButton = () => {
  const { isOpen, toggleSidebar } = useSidebarToggle()

  return (
    <button
      onClick={() => toggleSidebar()}
      className="cursor-pointer border border-gray_color rounded-md bg-gray_color/60 p-0.5 hover:bg-gray_color/80 transition-all"
    >
      <MenuIcon size={22} />
    </button>
  )
}

export default ToggleSidebarButton
