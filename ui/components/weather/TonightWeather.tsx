import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'
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
    <RoundFrame title="今夜の天気">
      <WeatherTimeline>
        <WeatherTimelineTable>
          <tr>
            <th>時刻</th>
            {data.weathers.map((weather: any) => (
              <td key={weather.dt}>
                <span>{('00' + (weather.hour % 24)).slice(-2)}:00</span>
              </td>
            ))}
          </tr>
          <tr>
            <th>天気</th>
            {data.weathers.map((weather: any) => (
              <td key={weather.dt}>
                <WeatherIcon icon={weather.weather.icon} scale={0.7} />
              </td>
            ))}
          </tr>
          <tr>
            <th>雲量</th>
            {data.weathers.map((weather: any) => (
              <td key={weather.dt}>
                <span>{weather.clouds}%</span>
              </td>
            ))}
          </tr>
          <tr>
            <th>観測条件</th>
            {data.weathers.map((weather: any) => (
              <td key={weather.dt}>
                <Condition
                  weatherCode={weather.weather.id}
                  clouds={weather.clouds}
                />
              </td>
            ))}
          </tr>
        </WeatherTimelineTable>
      </WeatherTimeline>
    </RoundFrame>
  )
}

const WeatherTimeline = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 16px;
`

const WeatherTimelineTable = styled.table`
  border-collapse: collapse;

  th {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 10000;
    white-space: nowrap;
    padding-right: 16px;
  }
`
