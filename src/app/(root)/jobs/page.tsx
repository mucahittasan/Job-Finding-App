import JobsHeader from '@/components/root/jobs/JobsHeader'
import JobsList from '@/components/root/jobs/JobsList'
import JobsPagination from '@/components/root/jobs/JobsPagination'
import { cookies } from 'next/headers'

const Page = () => {
  const nextCookies = cookies()

  const accessToken = nextCookies.get('accessToken')?.value

  if (!accessToken) {
    return <div>You have to login first!</div>
  }

  return (
    <div className="px-4">
      <JobsHeader />
      <JobsList />
      <JobsPagination />
    </div>
  )
}

export default Page
