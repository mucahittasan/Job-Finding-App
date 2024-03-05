import JobsHeader from '@/components/root/jobs/JobsHeader'
import JobsList from '@/components/root/jobs/JobsList'
import { cookies } from 'next/headers'

const Page = () => {
  const nextCookies = cookies()

  const accessToken = nextCookies.get('accessToken')?.value

  if (!accessToken) {
    return <div>You have to login first!</div>
  }

  return (
    <div className="md:px-4 px-1">
      <JobsHeader />
      <JobsList />
    </div>
  )
}

export default Page
