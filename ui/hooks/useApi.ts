export const useApi = () => {
  const fetcher = (url: string, fallbackLoginPage: boolean): Promise<any> => {
    return fetch(url).then((res) => {
      if (!res.ok) {
        if (fallbackLoginPage) {
          window.location.href = '/login?redirect=' + location.pathname
          return
        } else {
          throw Error
        }
      }
      return res.json()
    })
  }

  const postFetcher = (url: string, body: any): Promise<any> => {
    return fetch(url, { method: 'POST', body: JSON.stringify(body) }).then(
      (res) => {
        return res.json()
      },
    )
  }

  return {
    fetcher,
    postFetcher,
  }
}
