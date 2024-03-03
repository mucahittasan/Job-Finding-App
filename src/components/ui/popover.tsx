import React from 'react'

interface PopoverInterface {
  isOpen: boolean
  children: React.ReactNode
  className?: string
}

const Popover: React.FC<PopoverInterface> = ({
  isOpen,
  children,
  className,
}) => {
  return (
    <div
      className={`
            transition duration-200 absolute top-[calc(100%+10px)] right-0  rounded-lg bg-white  text-dark flex flex-col items-start w-full 
            ${
              isOpen
                ? 'opacity-[1] translate-y-0 z-50 '
                : 'translate-y-2 opacity-0 -z-50'
            }
            ${className}
        `}
    >
      {children}
    </div>
  )
}

export default Popover
