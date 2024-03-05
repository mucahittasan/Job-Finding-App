import create from 'zustand'

type SidebarToggleState = {
  isOpen: boolean
  toggleSidebar: () => void
}

const useSidebarToggle = create<SidebarToggleState>((set) => {
  const initialIsOpen = window.innerWidth >= 1024

  return {
    isOpen: initialIsOpen,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  }
})

export default useSidebarToggle
