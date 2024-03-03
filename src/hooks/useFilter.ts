import { create } from 'zustand'

interface FilterStore {
  orderByField?: string
  orderByDirection?: string
  searchQuery?: string
  showCount: number
  pageCount: number
  setPageCount: (count: number) => void
  setShowCount: (count: number) => void
  setFieldAndDirection: (field: string, direction: string) => void
  setSearchQuery: (query: string) => void
}

const useFilter = create<FilterStore>((set) => ({
  orderByField: undefined,
  orderByDirection: undefined,
  searchQuery: undefined,
  showCount: 10,
  pageCount: 1,
  setPageCount: (count: number) => set({ pageCount: count }),
  setShowCount: (count: number) => set({ showCount: count }),
  setFieldAndDirection: (field: string | '', direction: string | '') =>
    set({ orderByDirection: direction, orderByField: field }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))

export default useFilter
