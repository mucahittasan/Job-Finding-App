import { create } from 'zustand'

interface JobDetailModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useJobDetailModal = create<JobDetailModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useJobDetailModal
