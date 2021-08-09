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

  return {
    fetcher,
  }
}
