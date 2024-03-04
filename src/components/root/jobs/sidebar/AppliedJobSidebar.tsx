import AppliedJobList from './AppliedJobList'
import SidebarLogo from './SidebarLogo'

const AppliedJobSidebar = () => {
  return (
    <div className="flex-1 py-6 px-4">
      <SidebarLogo />
      <h2 className="text-center font-bold my-8 text-3xl">Applied Jobs</h2>
      <AppliedJobList />
    </div>
  )
}

export default AppliedJobSidebar
