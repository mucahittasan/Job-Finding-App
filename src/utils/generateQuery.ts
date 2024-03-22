export const GenerateQuery = (
  ...args: { key: string; value?: string | Record<string, string> }[]
) => {
  const encodeQueryParam = (
    key: string,
    value?: string | Record<string, string>,
  ) => {
    // Anahtarın URL bileşenlerine uygun bir şekilde kodlanması
    const encodedKey = encodeURIComponent(key)

    // Değerin boş veya tanımsız olup olmadığının kontrolü
    if (value === undefined || value === '') {
      return ''
    }

    // Değer bir nesne ise (örneğin, { field: 'name', value: 'John' })
    if (typeof value === 'object') {
      // Nesnenin içindeki her anahtar-değer çiftini kodlayarak bir dize oluşturulması
      const encodedValue = Object.entries(value)
        .map(
          ([nestedKey, nestedValue]) =>
            encodeURIComponent(`${key}[${nestedKey}]`) +
            '=' +
            encodeURIComponent(nestedValue),
        )
        .join('&')

      return encodedValue
    }
    // Değer bir dize ise (örneğin, 'John')
    else if (typeof value === 'string') {
      // Dizeyi URL bileşenlerine uygun bir şekilde kodlayarak anahtar ve değeri birleştirme
      const encodedValue = encodeURIComponent(value)
      return `${encodedKey}=${encodedValue}`
    }
    // Değer ne bir nesne ne de bir dize ise, boş bir dize döndürme
    else {
      return ''
    }
  }

  // Oluşturulan sorgu parametrelerinin depolanacağı dizi
  const queryArray: string[] = []

  // args dizisindeki her öğe için encodeQueryParam fonksiyonunu çağırma ve sonucu diziye ekleyerek dönme
  args.forEach((arg) => {
    const encodedQueryParam = encodeQueryParam(arg.key, arg.value)
    // Boş olmayan parametreleri diziye ekleme
    if (encodedQueryParam.length > 0) {
      queryArray.push(encodedQueryParam)
    }
  })

  // Oluşturulan sorgu parametrelerini '&' ile birleştirerek tam sorgu dizesini oluşturma
  return queryArray.join('&')
}
