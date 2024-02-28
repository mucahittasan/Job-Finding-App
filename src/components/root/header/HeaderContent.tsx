import Button from '@/components/ui/Button'
import Link from 'next/link'

const HeaderContent = () => {
  return (
    <header className="flex px-4 h-20 items-center justify-between">
      <Link href={'/'}>Logo</Link>
      <Button
        // onClick={() => {}}
        variant={'primary'}
        className="font-semibold md:text-base text-xs md:h-10 h-8 transition duration-200 hover:scale-[1.05] "
      >
        Login
      </Button>
    </header>
  )
}

export default HeaderContent
