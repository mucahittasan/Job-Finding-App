import Button from '@/components/ui/Button'
import Link from 'next/link'

const HeaderContent = () => {
  return (
    <header className="flex px-4 h-20 items-center justify-between max-w-7xl mx-auto w-full">
      <Link
        href={'/'}
        className="text-3xl font-bold"
      >
        ACME
      </Link>
      <div className="flex gap-x-4">
        <Button
          // onClick={() => {}}
          variant={'primary'}
          className="font-semibold md:text-base text-xs md:h-10 h-8 transition duration-200 hover:scale-[1.05] w-[98px]"
        >
          Login
        </Button>
        <Button
          // onClick={() => {}}
          variant={'secondary'}
          className="font-semibold md:text-base text-xs md:h-10 h-8 transition duration-200 hover:scale-[1.05] w-[98px]"
        >
          Sign Up
        </Button>
      </div>
    </header>
  )
}

export default HeaderContent
