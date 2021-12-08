import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { PrefectureSelectMoonRiseSet } from './PrefectureSelectMoonRiseSet'

export const MoonRiseSet: React.FC = () => {
  const [prefecture, setPrefecture] = useState('東京都')
  const [rise, setRise] = useState('')
  const [set, setSet] = useState('')

  const { fetcher } = useApi()

  useEffect(() => {
    const localStoragePref = localStorage.getItem('prefecture')
    if (localStoragePref) setPrefecture(localStoragePref)
  }, [])

  useEffect(() => {
    localStorage.setItem('prefecture', prefecture)
    fetcher('/api/moonRiseSet?pref=' + prefecture, false).then((res) => {
      setRise(res.rise_and_set.moonrise_hm)
      setSet(res.rise_and_set.moonset_hm)
    })
  }, [prefecture])

  return (
    <MoonRiseSetInfo>
      <div>月の出</div>
      <TimeText>{rise}</TimeText>
      <div>月の入</div>
      <TimeText>{set}</TimeText>
      <PrefectureSelectMoonRiseSet
        value={prefecture}
        onChange={(v) => setPrefecture(v)}
      />
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
