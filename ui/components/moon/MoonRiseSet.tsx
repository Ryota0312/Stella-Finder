import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export const MoonRiseSet: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/moonRiseSet', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <div>{data.rise_and_set.moonrise_hm}</div>
      <div>{data.rise_and_set.moonset_hm}</div>
    </div>
  )
}
