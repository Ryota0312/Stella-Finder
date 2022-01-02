import useSWR from 'swr'
import React from 'react'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from './TinyLoading'

export type SpecifiedUserOnlyProps = {
  userId: number
  children: React.ReactNode
}

export const SpecifiedUserOnly: React.FC<SpecifiedUserOnlyProps> = (
  props: SpecifiedUserOnlyProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return <div>{data.id === props.userId && props.children}</div>
}
