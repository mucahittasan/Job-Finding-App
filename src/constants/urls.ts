import { GenerateQuery } from '../utils/generateQuery'
import { BASE_API_ADDRESS } from './base'

export const registerUrl = () => {
  return `${BASE_API_ADDRESS}/register`
}
export const loginUrl = () => {
  return `${BASE_API_ADDRESS}/login`
}
export const userUrl = () => {
  return `${BASE_API_ADDRESS}/user`
}
export const refreshTokenUrl = () => {
  return `${BASE_API_ADDRESS}/refresh`
}

export const getJobById = (id: string) => {
  return `${BASE_API_ADDRESS}/jobs/${id}`
}

export const getAllJobs = (props: {
  page: number
  perPage: number
  orderByField?: string
  orderByDirection?: string
  searchField?: string
  searchQuery?: string
}) => {
  const query = GenerateQuery(
    { key: 'page', value: props.page?.toString() },
    { key: 'perPage', value: props.perPage?.toString() },
    { key: 'orderBy[field]', value: props.orderByField },
    { key: 'orderBy[direction]', value: props.orderByDirection },
    { key: 'search[field]', value: props.searchField },
    { key: 'search[query]', value: props.searchQuery },
  )

  return `${BASE_API_ADDRESS}/jobs?${query}`
}
