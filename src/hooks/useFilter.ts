import { create } from 'zustand'

interface FilterStore {
  orderByField?: string
  orderByDirection?: string
  setFieldAndDirection: (field: string, direction: string) => void
}

const useFilter = create<FilterStore>((set) => ({
  orderByField: undefined,
  orderByDirection: undefined,
  setFieldAndDirection: (field: string | '', direction: string | '') =>
    set({ orderByDirection: direction, orderByField: field }),
}))

export default useFilter
