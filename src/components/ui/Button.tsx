import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  size?: 'sm' | 'default' | 'lg'
  className?: string
  isLoading?: boolean
}

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  onClick,
  size = 'default',
  className,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition gap-x-2
      ${className}
      ${variant === 'primary' && 'bg-white text-dark hover:bg-white/80'}
      ${variant === 'secondary' && 'bg-white/10 text-white hover:bg-white/30'}
      ${size === 'sm' && 'h-9 px-3 py-2 rounded-md'}
      ${size === 'default' && 'h-10 rounded-md px-4 '}
      ${size === 'lg' && 'h-11 px-8 rounded-md '}
  `}
      disabled={isLoading}
    >
      {children}
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
    </button>
  )
}

export default Button
