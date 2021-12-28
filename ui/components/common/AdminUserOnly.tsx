import useSWR from 'swr'
import React from 'react'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from './TinyLoading'

export type AdminUserOnlyProps = {
  children: React.ReactNode
  fallbackComponent?: React.ReactNode
}

export const AdminUserOnly: React.FC<AdminUserOnlyProps> = (
  props: AdminUserOnlyProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/checkAdmin', false], fetcher)

  if (error) return <div>{props.fallbackComponent}</div>
  if (!data) return <TinyLoading />

  return (
    <>
      {data.authorized && props.children}
      {!data.authorized && props.fallbackComponent}
    </>
  )
}
