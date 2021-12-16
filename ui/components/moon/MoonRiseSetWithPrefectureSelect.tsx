import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { RoundFrame } from '../common/RoundFrame'
import { PrefectureSelectMoonRiseSet } from './PrefectureSelectMoonRiseSet'

export const MoonRiseSetWithPrefectureSelect: React.FC = () => {
  const [prefecture, setPrefecture] = useState('')
  const [rise, setRise] = useState('--:--')
  const [set, setSet] = useState('--:--')

  const { fetcher } = useApi()

  useEffect(() => {
    const localStoragePref = localStorage.getItem('prefecture')
    if (localStoragePref) {
      setPrefecture(localStoragePref)
    } else {
      setPrefecture('東京都')
    }
  }, [])

  useEffect(() => {
    if (prefecture !== '') {
      localStorage.setItem('prefecture', prefecture)
      fetcher('/api/moonRiseSet?pref=' + prefecture, false).then((res) => {
        setRise(res.rise_and_set.moonrise_hm)
        setSet(res.rise_and_set.moonset_hm)
      })
    }
  }, [prefecture])

  return (
    <RoundFrame>
      <div>月の出</div>
      <TimeText>{rise}</TimeText>
      <div>月の入</div>
      <TimeText>{set}</TimeText>
      <PrefectureSelectMoonRiseSet
        value={prefecture}
        onChange={(v) => setPrefecture(v)}
      />
    </RoundFrame>
  )
}

const TimeText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2a2467;
`
