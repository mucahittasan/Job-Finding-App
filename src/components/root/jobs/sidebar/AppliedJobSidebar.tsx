'use client'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useSidebarToggle from '@/hooks/useSidebarToggle'
import { useEffect, useState } from 'react'
import AppliedJobList from './AppliedJobList'
import SidebarLogo from './SidebarLogo'

const AppliedJobSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarToggle()
  const { currentUser } = useLoginModal()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    if (window.innerWidth < 1024) {
      toggleSidebar()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth < 1024) {
      isOpen && toggleSidebar()
    } else {
      !isOpen && toggleSidebar()
    }
  }, [windowWidth])

  if (!currentUser) {
    return null
  }

  return (
    <div
      className={` transition-all duration-300  py-6 lg:static fixed lg:bg-transparent bg-dark/95 lg:w-auto w-full lg:translate-y-0 lg:h-auto h-screen
      ${
        !isOpen
          ? 'w-[40px] px-1 -translate-y-full'
          : 'flex-1 px-4 translate-y-[0] '
      } 
      `}
    >
      <SidebarLogo />
      <h2
        className={`text-center font-bold my-8 text-3xl ${
          !isOpen ? 'w-0 opacity-0 -z-30' : 'w-auto opacity-[1]'
        }`}
      >
        Applied Jobs
      </h2>
      <AppliedJobList />
    </div>
  )
}

export default AppliedJobSidebar
