export const useApi = () => {
  const fetcher = (url: string, fallbackLoginPage: boolean): Promise<any> => {
    return fetch(url).then((res) => {
      if (fallbackLoginPage && !res.ok) {
        window.location.href = '/login'
        return
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
