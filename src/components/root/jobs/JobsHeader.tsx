'use client'

import useFilter from '@/hooks/useFilter'
import FilterMenu from './FilterMenu'

const JobsHeader = () => {
  const { setSearchQuery } = useFilter()

  return (
    <header className="py-4 border-b border-b-gray_color/30 flex items-center justify-between">
      <input
        placeholder="Search.."
        className="w-[400px] text-sm text-dark py-2 font-medium bg-white border-[1px] rounded-lg outline-none transition pl-4"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FilterMenu />
    </header>
  )
}

export default JobsHeader
