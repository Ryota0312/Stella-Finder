import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'

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
  if (!data) return <TinyLoading />

  return (
    <RoundFrame>
      <div>
        <Title>{props.prefecture}</Title>
        <div>月の出</div>
        <TimeText>{data.rise_and_set.moonrise_hm}</TimeText>
        <div>月の入</div>
        <TimeText>{data.rise_and_set.moonset_hm}</TimeText>
      </div>
    </RoundFrame>
  )
}

const Title = styled.div`
  font-size: 24px;
`

const TimeText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2a2467;
`
