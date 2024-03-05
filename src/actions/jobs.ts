import { getAllJobs } from '../constants/urls'
import { GenerateQuery } from '../utils/generateQuery'

export const fetchJobs = async (
  pageCount: number,
  showCount: number,
  orderByDirection?: string,
  orderByField?: string,
  searchQuery?: string,
  accessToken?: string,
) => {
  const baseQuery = {
    page: pageCount,
    perPage: showCount,
    orderByField: orderByDirection,
    orderByDirection: orderByField,
  }

  const searchQueryParams = searchQuery
    ? [
        {
          key: 'search',
          value: {
            field: 'name',
            query: searchQuery,
          },
        },
      ]
    : []

  const response = await fetch(
    `${getAllJobs(baseQuery)}&${GenerateQuery(...searchQueryParams)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.json()
}
