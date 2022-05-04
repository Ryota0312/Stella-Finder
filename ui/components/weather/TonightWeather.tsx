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
        <WeatherTimelineTable>
          {/*<thead>*/}
          {/*  <tr>*/}
          {/*    <th>時刻</th>*/}
          {/*  </tr>*/}
          {/*  <tr>*/}
          {/*    <th>天気</th>*/}
          {/*  </tr>*/}
          {/*  <tr>*/}
          {/*    <th>雲量</th>*/}
          {/*  </tr>*/}
          {/*  <tr>*/}
          {/*    <th>観測条件</th>*/}
          {/*  </tr>*/}
          {/*</thead>*/}
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
  overflow-x: auto;
  overflow-y: hidden;
`

const WeatherTimelineTable = styled.table`
  border-collapse: collapse;

  th {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 10000;
    white-space: nowrap;
  }
`
