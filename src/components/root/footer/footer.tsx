import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="content flex items-center justify-between py-6 px-4">
      <Link
        href={'/'}
        className="font-bold md:text-3xl text-2xl"
      >
        ACME
      </Link>
      <p className="text-gray_color font-semibold md:text-sm text-xs">
        © 2010 — 2024 Privacy — Terms
      </p>
    </footer>
  )
}

export default Footer
