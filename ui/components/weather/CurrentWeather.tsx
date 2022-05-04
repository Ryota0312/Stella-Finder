import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { WeatherIcon } from './WeatherIcon'
import { Condition } from './Condition'

type CurrentWeatherProps = {
  spotId: number
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = (
  props: CurrentWeatherProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    props.spotId
      ? ['/api/spot/weather/current?spotId=' + props.spotId, false]
      : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <WeatherInfo>
      <Title>現在の天気</Title>
      <IconAndClouds>
        <WeatherIcon icon={data.weather[0].icon} />
        <div>
          <div>雲量</div>
          <Clouds>{data.clouds.all}%</Clouds>
        </div>
        <div>
          <div>観測条件</div>
          <Condition
            weatherCode={data.weather[0].id}
            clouds={data.clouds.all}
          />
        </div>
      </IconAndClouds>
    </WeatherInfo>
  )
}

const WeatherInfo = styled.div`
  flex: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
`

const Title = styled.div`
  font-size: 24px;
`

const Clouds = styled.div`
  font-size: 24px;
  margin-left: 8px;
`

const IconAndClouds = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 8px;
`
