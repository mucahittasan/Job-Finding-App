import type { Metadata } from 'next'

import Header from '@/components/root/header/Header'
import AppliedJobSidebar from '@/components/root/jobs/sidebar/AppliedJobSidebar'
import JobDetailModal from '@/components/ui/modals/JobDetailModal'

export const metadata: Metadata = {
  title: 'Acme | Jobs',
  description:
    'Explore a variety of job opportunities with Acme. Find the perfect job that suits your skills and interests. Discover a range of positions in different industries and start your career journey today.',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex ">
      <div className="md:flex-[2.8] w-full">
        <Header />
        <JobDetailModal />

        {children}
      </div>

      <AppliedJobSidebar />
    </div>
  )
}
