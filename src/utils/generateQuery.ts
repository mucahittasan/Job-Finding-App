export const GenerateQuery = (
  ...args: { key: string; value?: string | Record<string, string> }[]
) => {
  const queryArray: string[] = []

  args.forEach((arg) => {
    if (arg.key == undefined || arg.key.length == 0 || arg.value == undefined)
      return

    if (arg.key === 'page' || arg.key === 'perPage') {
      queryArray.push(`${arg.key}=${encodeURIComponent(arg.value.toString())}`)
    } else if (typeof arg.value === 'string') {
      const encodedKey = encodeURIComponent(arg.key)
      const encodedValue = encodeURIComponent(arg.value)
      queryArray.push(`${encodedKey}=${encodedValue}`)
    } else if (typeof arg.value === 'object') {
      Object.entries(arg.value).forEach(([nestedKey, nestedValue]) => {
        if (nestedValue != undefined && nestedValue.toString().length > 0) {
          const encodedKey = encodeURIComponent(arg.key)
          const encodedNestedKey = encodeURIComponent(`[${nestedKey}]`)
          const encodedNestedValue = encodeURIComponent(nestedValue)
          queryArray.push(
            `${encodedKey}${encodedNestedKey}=${encodedNestedValue}`,
          )
        }
      })
    }
  })

  return queryArray.join('&')
}
