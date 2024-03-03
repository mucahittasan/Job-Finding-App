import { create } from 'zustand'

interface JobDetailModalStore {
  currentJob: string | null
  setCurrentJob: (job: string) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useJobDetailModal = create<JobDetailModalStore>((set) => ({
  currentJob: null,
  setCurrentJob: (job: string) => set({ currentJob: job }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useJobDetailModal
