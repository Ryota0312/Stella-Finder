import { useRouter } from 'next/router'

export const useFragment = () => {
  const router = useRouter()
  const fragment = extractFragment(router.asPath)

  const setFragment = (newHash: string) => {
    return router.replace(
      { query: { ...router.query }, hash: newHash },
      undefined,
      { shallow: true },
    )
  }

  return { fragment, setFragment }
}

function extractFragment(url: string): string {
  return url.split('#')[1] ?? ''
}
