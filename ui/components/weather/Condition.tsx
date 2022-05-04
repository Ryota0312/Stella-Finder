import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { number } from 'prop-types'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { WeatherIcon } from './WeatherIcon'

type ConditionProps = {
  weatherCode: number
  clouds: number
}

export const Condition: React.FC<ConditionProps> = (props: ConditionProps) => {
  const condition = getCondition_(props.weatherCode, props.clouds)

  return (
    <>
      {condition == 0 && <BadCondition>✕</BadCondition>}
      {condition == 1 && <NormalCondition>△</NormalCondition>}
      {condition == 2 && <GoodCondition>○</GoodCondition>}
      {condition == 3 && <GoodCondition>◎</GoodCondition>}
    </>
  )
}

const ConditionText = styled.div`
  font-size: 24px;
  margin-left: 8px;
  font-weight: bold;
`

const BadCondition = styled(ConditionText)`
  color: red;
`

const NormalCondition = styled(ConditionText)`
  color: #ffa500;
`

const GoodCondition = styled(ConditionText)`
  color: #1ede1e;
`

/**
 * @param {number} weatherCode
 * @param {number} clouds
 * @return {number} 0=最悪, 1=悪, 2=良, 3=最良
 */
const getCondition_ = (weatherCode: number, clouds: number) => {
  let condition
  switch (weatherCode) {
    case 800:
      if (clouds < 10) {
        condition = 3
      } else {
        condition = 2
      }
      break
    case 801:
    case 802:
      condition = 2
      break
    case 803:
      condition = 1
      break
    case 804:
      condition = 0
      break
    default:
      condition = 0
  }

  return condition
}
