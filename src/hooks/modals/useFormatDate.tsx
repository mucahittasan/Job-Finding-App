import { useEffect, useState } from 'react'

const useCustomDateFormatter = (originalDateString: string) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null)

  useEffect(() => {
    const originalDate = new Date(originalDateString)

    const day = originalDate.getDate()
    const month = originalDate.getMonth() + 1
    const year = originalDate.getFullYear()

    const formattedDateResult =
      (day < 10 ? '0' : '') +
      day +
      '.' +
      (month < 10 ? '0' : '') +
      month +
      '.' +
      year

    setFormattedDate(formattedDateResult)
  }, [originalDateString])

  return formattedDate
}

export default useCustomDateFormatter
