export const GenerateQuery = (
  ...args: { key: string; value?: string | Record<string, string> }[]
) => {
  const encodeQueryParam = (
    key: string,
    value?: string | Record<string, string>,
  ) => {
    const encodedKey = encodeURIComponent(key)
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
    if (arg.key == undefined || arg.key.length == 0 || arg.value == undefined)
      return

    const encodedQueryParam = encodeQueryParam(arg.key, arg.value)
    if (encodedQueryParam.length > 0) {
      queryArray.push(encodedQueryParam)
    }
  })

  return queryArray.join('&')
}
