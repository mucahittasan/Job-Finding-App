'use client'

import Button from '@/components/ui/Button'
import { buttons } from '@/constants/FilterButtons'
import useFilter from '@/hooks/useFilter'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const FilterMenu = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<string>('')
  const menuRef = useRef<HTMLDivElement>(null)

  const { setFieldAndDirection } = useFilter()

  const handleClick = (button: {
    text: string
    orderByField: string
    orderByDirection: string
  }) => {
    if (button.text === activeFilter) {
      setActiveFilter('')
      setFieldAndDirection('', '')
    } else {
      setActiveFilter(button.text)
      setFieldAndDirection(button.orderByDirection, button.orderByField)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-gradient-to-tr from-primary_color to-secondary_color hover:from-primary_color/80 hover:to-secondary_color/90 text-white font-semibold active:scale-[.97] "
      >
        <span>Select a Field</span>
        <ChevronDown
          size={20}
          className={`transition duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Button>
      <div
        className={`${
          open
            ? 'z-10 opacity-[1] visible translate-y-0'
            : 'opacity-0 invisible translate-y-2 -z-50'
        } absolute transition-all duration-200 bg-white text-dark rounded-md w-[200px] p-2 right-0 top-14`}
      >
        <div className="font-bold border-b border-b-gray_color/30 text-dark flex items-center justify-between pb-1">
          <span className="text-dark">FIELDS</span>
          <button onClick={() => setOpen(false)}>
            <X
              className=" transition-all text-red-500 hover:text-red-500/60"
              size={18}
            />
          </button>
        </div>
        <div className="my-1 flex flex-col gap-y-2 items-start py-1">
          {buttons.map((button, i) => (
            <button
              key={i}
              className={` ${
                activeFilter === button.text
                  ? 'bg-primary_color text-white'
                  : 'bg-transparent text-dark  hover:text-primary_color'
              }  w-full text-left p-1.5 text-sm font-medium  rounded-md transition-all duration-200`}
              onClick={() => handleClick(button)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
