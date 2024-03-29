'use client'

import Link from 'next/link'

import Button from '@/components/ui/Button'

import useLoginModal from '@/hooks/modals/useLoginModal'
import useRegisterModal from '@/hooks/modals/useRegisterModal'
import Cookies from 'js-cookie'
import { ChevronDown, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchCurrentUser } from '../../../actions/user'
import Popover from '../../ui/popover'
import ToggleSidebarButton from '../jobs/sidebar/ToggleSidebarButton'

const HeaderContent = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const pathname = usePathname()
  const router = useRouter()

  const [popover, setPopover] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleLogout = () => {
    Cookies.remove('accessToken', { path: '/' })
    loginModal.setCurrentUser(null)
    setPopover(false)
    router.push('/')
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true)
      try {
        await fetchCurrentUser(Cookies.get('accessToken')).then((data) => {
          loginModal.setCurrentUser(data)
          setLoading(false)
        })
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getCurrentUser()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPopover(false)
    }
  }, [])

  return (
    <header
      className={`flex px-4 md:py-6 py-2 items-center justify-between ${
        pathname === '/' && 'content'
      }`}
    >
      <Link
        href={'/'}
        className="md:text-3xl text-2xl font-bold"
      >
        ACME
      </Link>
      <div className="flex items-center gap-x-4">
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : loginModal.currentUser ? (
          <div className="relative">
            <Button
              onClick={() => setPopover((prev) => !prev)}
              variant={'primary'}
              className="font-semibold  bg-white/20 text-white hover:!bg-white/10 md:!px-4 !px-1"
            >
              <Image
                src={loginModal.currentUser?.profileImage ?? ''}
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full aspect-square object-cover"
              />
              <span className="text-white md:text-sm text-xs">
                {loginModal.currentUser?.email &&
                  loginModal.currentUser.email.split('@')[0]}
              </span>{' '}
              <ChevronDown
                className={`transition duration-300 ${
                  popover ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Button>
            <Popover isOpen={popover}>
              <Link
                href={'/jobs'}
                className="font-medium border-b-[1px] px-3 py-2 border-gray_color/20 w-full text-start"
              >
                Job List
              </Link>
              <button
                onClick={() => handleLogout()}
                className="font-medium text-red-600 px-3 py-2 w-full text-start flex items-center gap-x-2"
              >
                <span>Log out</span>
              </button>
            </Popover>
          </div>
        ) : (
          <>
            <Button
              onClick={loginModal.onOpen}
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
          </>
        )}
        {pathname !== '/' && (
          <div className="lg:hidden block py-6 px-1">
            <ToggleSidebarButton />
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderContent
