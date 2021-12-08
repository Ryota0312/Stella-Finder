import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export const MoonRiseSet: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    ['/api/moonRiseSet?pref=東京都', false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <MoonRiseSetInfo>
      <div>月の出</div>
      <TimeText>{data.rise_and_set.moonrise_hm}</TimeText>
      <div>月の入</div>
      <TimeText>{data.rise_and_set.moonset_hm}</TimeText>
      <div>(東京)</div>
    </MoonRiseSetInfo>
  )
}

const MoonRiseSetInfo = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 8px 0;
`

const TimeText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2a2467;
`
