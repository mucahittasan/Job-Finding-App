import { create } from 'zustand'

interface FilterStore {
  orderByField?: string
  orderByDirection?: string
  searchQuery?: string
  setFieldAndDirection: (field: string, direction: string) => void
  setSearchQuery: (query: string) => void
}

const useFilter = create<FilterStore>((set) => ({
  orderByField: undefined,
  orderByDirection: undefined,
  searchQuery: undefined,
  setFieldAndDirection: (field: string | '', direction: string | '') =>
    set({ orderByDirection: direction, orderByField: field }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))

export default useFilter
