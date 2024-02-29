import JobsHeader from '@/components/root/jobs/JobsHeader'
import JobsList from '@/components/root/jobs/JobsList'
import JobsPagination from '@/components/root/jobs/JobsPagination'

const Page = () => {
  return (
    <div className="px-4">
      <JobsHeader />
      <JobsList />
      <JobsPagination />
    </div>
  )
}

export default Page
