import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { WeatherIcon } from './WeatherIcon'
import { Condition } from './Condition'

type TonightWeatherProps = {
  spotId: number
}

export const TonightWeather: React.FC<TonightWeatherProps> = (
  props: TonightWeatherProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    props.spotId
      ? ['/api/spot/weather/tonight?spotId=' + props.spotId, false]
      : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <TonightWeatherInfo>
      <Title>今夜の天気</Title>
      <WeatherTimeline>
        {data.weathers.map((weather: any, i: number) => (
          <WeatherTimelineItem key={i}>
            <span>{('00' + ((i + 18) % 24)).slice(-2)}:00</span>
            <WeatherIcon icon={weather.weather.icon} />
          </WeatherTimelineItem>
        ))}
      </WeatherTimeline>
    </TonightWeatherInfo>
  )
}

const TonightWeatherInfo = styled.div`
  //flex: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin: 8px 0;
`

const Title = styled.div`
  font-size: 24px;
`

const WeatherTimeline = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
`

const WeatherTimelineItem = styled.div`
  text-align: center;
`
