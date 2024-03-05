export const GenerateQuery = (
  ...args: { key: string; value?: string | Record<string, string> }[]
) => {
  const encodeQueryParam = (
    key: string,
    value?: string | Record<string, string>,
  ) => {
    const encodedKey = encodeURIComponent(key)

    if (value === undefined || value === '') {
      return ''
    }

    if (typeof value === 'object') {
      const encodedValue = Object.entries(value)
        .map(
          ([nestedKey, nestedValue]) =>
            encodeURIComponent(`${key}[${nestedKey}]`) +
            '=' +
            encodeURIComponent(nestedValue),
        )
        .join('&')
      return encodedValue
    } else if (typeof value === 'string') {
      const encodedValue = encodeURIComponent(value)
      return `${encodedKey}=${encodedValue}`
    } else {
      return ''
    }
  }

  const queryArray: string[] = []

  args.forEach((arg) => {
    const encodedQueryParam = encodeQueryParam(arg.key, arg.value)
    if (encodedQueryParam.length > 0) {
      queryArray.push(encodedQueryParam)
    }
  })

  return queryArray.join('&')
}
