import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="content flex items-center justify-between py-6">
      <Link
        href={'/'}
        className="font-bold text-3xl "
      >
        ACME
      </Link>
      <p className="text-gray_color font-semibold">
        © 2010 — 2024 Privacy — Terms
      </p>
    </footer>
  )
}

export default Footer
