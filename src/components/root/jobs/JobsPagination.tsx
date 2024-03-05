'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import Popover from '@/components/ui/popover'

import useFilter from '@/hooks/useFilter'

const JobsPagination = () => {
  const [openShowCount, setOpenShowCount] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  const { setShowCount, showCount, pageCount, setPageCount, totalShowCount } =
    useFilter()
  const showCounts = [5, 10, 20, 25]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
    }
  }, [])

  const handlePrev = () => {
    if (pageCount !== 1) {
      setPageCount(pageCount - 1)
    }
  }

  const handleNext = () => {
    if (pageCount !== Math.round(totalShowCount / showCount)) {
      setPageCount(pageCount + 1)
    }
  }
  if (!mounted) return null
  return (
    <div className="flex items-center md:flex-row flex-col justify-between bg-[rgb(133,133,133)]/10 sm:min-h-[50px] sm:py-0 py-2 rounded-md px-2 mt-4 gap-y-4">
      <div className="sm:inline-block hidden"></div>
      <div className="flex items-center gap-x-4 order-2">
        <Button
          onClick={() => handlePrev()}
          className={`h-[25px] ${
            pageCount === 1
              ? '!bg-gray_color/20 text-gray_color hover:!bg-gray_color/20'
              : ''
          }`}
          disabled={pageCount === 1}
        >
          Prev
        </Button>
        <button className="text-white font-semibold flex gap-x-1">
          <span>{pageCount}</span>/
          <span className="text-gray_color">
            {Math.round(totalShowCount / showCount)}
          </span>
        </button>
        <Button
          onClick={() => handleNext()}
          className={`h-[25px] ${
            Math.round(totalShowCount / showCount) === pageCount
              ? '!bg-gray_color/20 text-gray_color hover:!bg-gray_color/20'
              : ''
          }`}
          disabled={showCount === pageCount}
        >
          Next
        </Button>
      </div>
      <div className="flex gap-x-2 items-center order-1">
        <span className="font-semibold text-sm">Show</span>
        <Button
          variant="secondary"
          className="h-[25px] px-2 py-1 relative"
          onClick={() => setOpenShowCount((prev) => !prev)}
        >
          <Popover
            isOpen={openShowCount}
            className={`!bottom-8 top-auto rounded-md left-0 w-full h-auto  flex flex-col gap-y-1 py-1 divide-y-[1px] divide-gray_color/30 px-1`}
          >
            {showCounts.map((count, i) => (
              <button
                key={i}
                className={`font-medium hover:text-primary_color transition duration-200 w-full rounded-md ${
                  showCount === count
                    ? 'bg-primary_color text-white hover:text-white'
                    : 'bg-transparent '
                }`}
                onClick={() => setShowCount(Number(count))}
              >
                {count}
              </button>
            ))}
          </Popover>
          <span>{showCount}</span>
          <span className="h-full w-[2px] bg-gray_color"></span>
          <ChevronDown
            className={`transition-all duration-200 ${
              openShowCount ? 'rotate-180' : 'rotate-0'
            }`}
            size={12}
          />
        </Button>
      </div>
    </div>
  )
}

export default JobsPagination
