'use client'

import useFilter from '@/hooks/useFilter'
import FilterMenu from './FilterMenu'

const JobsHeader = () => {
  const { setSearchQuery } = useFilter()

  return (
    <div className="py-4 border-b border-b-gray_color/30 flex md:flex-row flex-col md:items-center justify-between gap-y-4">
      <input
        placeholder="Search.."
        className=" text-sm text-dark md:py-2 py-1 font-medium bg-white border-[1px] md:rounded-lg rounded-md outline-none transition pl-4 md:w-[400px] w-full"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FilterMenu />
    </div>
  )
}

export default JobsHeader
