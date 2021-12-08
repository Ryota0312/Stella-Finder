import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'
import { PrefectureSelectMoonRiseSet } from './PrefectureSelectMoonRiseSet'

type MoonRiseSetProps = {
  prefecture: string
}

export const MoonRiseSet: React.FC<MoonRiseSetProps> = (
  props: MoonRiseSetProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    props.prefecture
      ? ['/api/moonRiseSet?pref=' + props.prefecture, false]
      : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <MoonRiseSetInfo>
      <Title>{props.prefecture}</Title>
      <div>月の出</div>
      <TimeText>{data.rise_and_set.moonrise_hm}</TimeText>
      <div>月の入</div>
      <TimeText>{data.rise_and_set.moonset_hm}</TimeText>
    </MoonRiseSetInfo>
  )
}

const Title = styled.div`
  font-size: 24px;
`

const MoonRiseSetInfo = styled.div`
  flex: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0;
`

const TimeText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2a2467;
`
