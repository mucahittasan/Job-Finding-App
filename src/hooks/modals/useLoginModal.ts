import { create } from 'zustand'
import { User } from '../../actions/user'

interface LoginModalStore {
  currentUser: User | null
  setCurrentUser: (user: any) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useLoginModal = create<LoginModalStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user: any) => set({ currentUser: user }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useLoginModal
