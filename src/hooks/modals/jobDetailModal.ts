import { Job } from '@/constants/JobList'
import { create } from 'zustand'

interface JobDetailModalStore {
  currentJob: Job | null
  setCurrentJob: (job: Job) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useJobDetailModal = create<JobDetailModalStore>((set) => ({
  currentJob: null,
  setCurrentJob: (job: Job) => set({ currentJob: job }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useJobDetailModal
