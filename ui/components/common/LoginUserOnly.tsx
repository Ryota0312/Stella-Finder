import useSWR from 'swr'
import React from 'react'
import { useApi } from '../../hooks/useApi'

export type LoginUserOnlyProps = {
  children: React.ReactNode
  fallbackComponent?: React.ReactNode
}

export const LoginUserOnly: React.FC<LoginUserOnlyProps> = (
  props: LoginUserOnlyProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      {data.authorized && props.children}
      {!data.authorized && props.fallbackComponent}
    </>
  )
}
