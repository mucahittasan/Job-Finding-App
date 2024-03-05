'use client'

import Button from '@/components/ui/Button'
import useJobDetailModal from '@/hooks/modals/jobDetailModal'
import { MotionDiv } from '@/utils/motions/Motions'
import { jobItemVariants } from '@/utils/motions/Variant'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Briefcase } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchCurrentUser } from '../../../actions/user'
import { withdrawJoburl } from '../../../constants/urls'
import useLoginModal from '../../../hooks/modals/useLoginModal'
interface JobItemProps {
  id: string
  jobName: string
  companyName: string
  keywords: string[]
  description: string
  salary: number
  location: string
  isApplied: boolean
}

const JobItem: FC<JobItemProps> = ({
  id,
  jobName,
  companyName,
  keywords,
  description,
  salary,
  location,
  isApplied,
}) => {
  const jobDetailModal = useJobDetailModal()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const firstThreeKeywords = () => {
    return keywords.length > 0 ? keywords.slice(0, 3) : []
  }

  const firstThree = firstThreeKeywords()

  const handleWithDraw = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(withdrawJoburl(id), id, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      toast.success(response.data.message)

      await fetchCurrentUser(Cookies.get('accessToken')).then((data) => {
        loginModal.setCurrentUser(data)
      })

      return response.data
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(loginModal.currentUser)
  }, [loginModal.currentUser])

  return (
    <MotionDiv
      variants={jobItemVariants}
      initial="hidden"
      animate="visible"
      className="flex md:flex-row flex-col justify-between border-b border-b-gray_color/50 py-4 "
    >
      <div className="flex gap-4">
        <Briefcase
          size={50}
          className="md:min-w-[50px] min-w-[30px]"
        />
        <div className="flex flex-col items-start gap-y-4 ">
          <div className="flex md:flex-row flex-col md:items-center gap-x-2 md:text-2xl text-xl font-bold">
            <h3>{companyName}</h3>
            <span className="md:inline-block hidden">-</span>
            <h3 className="text-zinc-400">{jobName}</h3>
          </div>
          <p className="text-sm font-medium text-gray-400 max-w-[80%]">
            {description}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-primary_color font-semibold">Location:</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-primary_color font-semibold">Salary:</span>
            <span>{salary} $</span>
          </div>

          <div className="flex items-center gap-x-4 my-4">
            {firstThree.map((keyword, i) => (
              <div
                key={i}
                className="bg-secondary_color/80 px-3 py-1 rounded-md text-sm"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 items-start">
        {!isApplied ? (
          <Button
            className="w-full"
            onClick={() => {
              jobDetailModal.setCurrentJob(id)
              jobDetailModal.onOpen()
            }}
          >
            Detail
          </Button>
        ) : (
          <Button
            onClick={() => handleWithDraw()}
            isLoading={isLoading}
            className="w-full !bg-white/20 text-white hover:!bg-white/30"
          >
            Withdraw
          </Button>
        )}
      </div>
    </MotionDiv>
  )
}

export default JobItem
