import React, { useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { string } from 'prop-types'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { MoonAge } from '../../components/moon/MoonAge'
import { useApi } from '../../hooks/useApi'
import { Loading } from '../../components/common/Loading'
import { MoonAgeIllustration } from '../../components/moon/MoonAgeIllustration'

const Monthly: React.FC = () => {
  const dt = new Date()

  const [year, setYear] = useState(dt.getFullYear())
  const [month, setMonth] = useState(dt.getMonth() + 1)
  let dayCount = -1

  const { fetcher } = useApi()
  const { data, error } = useSWR(
    [
      `/api/moonRiseSetAgeMonthly?pref=東京都&year=${year}&month=${month}`,
      false,
    ],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>月の出・月の入・月齢 | Stella Finder</title>
      </Head>
      <main>
        <h2>月の出・月の入・月齢</h2>
        <div>
          {year}年{month}月
        </div>
        <table>
          <thead>
            <tr>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, week) => {
              return (
                <tr key={week + 'w'}>
                  {getWeek(year, month, week + 1).map((day, i) => {
                    if (day) {
                      dayCount = dayCount + 1
                      console.log(dayCount)
                      return (
                        <td key={`${week}week${i}day`}>
                          <div>{day.day}</div>
                          <MoonAgeIllustration
                            canvasId={`${week}week${i}day`}
                            moonAge={data.results[dayCount].moonAge.moon_age}
                            size={100}
                          />
                          <div>
                            出:
                            {
                              data.results[dayCount].riseAndSet.rise_and_set
                                .moonrise_hm
                            }
                          </div>
                          <div>
                            没:
                            {
                              data.results[dayCount].riseAndSet.rise_and_set
                                .moonset_hm
                            }
                          </div>
                        </td>
                      )
                    } else {
                      return <td key={`${week}week${i}day`}>-</td>
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </Layout>
  )
}
export default Monthly

type Day = {
  year: number
  month: number
  day: number
  dayOfWeek: number // 0: Sunday ~ 6: Saturday
}

const getWeek = (
  year: number,
  month: number, // zero origin
  week: number,
): Array<Day | null> => {
  const month1origin = month - 1
  let result: Array<Day | null>
  const firstDayOfMonth = new Date(year, month1origin, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const firstDayInSecondWeek = 7 - firstDayOfWeek + 1

  if (week === 1) {
    result = [...Array(7)].map((_, index) => {
      if (index >= firstDayOfWeek) {
        return {
          year: year,
          month: month1origin,
          day: 1 + index - firstDayOfWeek,
          dayOfWeek: index,
        } as Day
      } else {
        return null
      }
    })
  } else if (week === 5) {
    const firstDayInThisWeek = firstDayInSecondWeek + 7 * (week - 2)
    const lastDayOfMonth = new Date(year, month1origin + 1, 0).getDate()

    result = [...Array(7)].map((_, index) => {
      if (firstDayInThisWeek + index <= lastDayOfMonth) {
        return {
          year: year,
          month: month1origin,
          day: firstDayInThisWeek + index,
          dayOfWeek: index,
        } as Day
      } else {
        return null
      }
    })
  } else {
    const firstDayInThisWeek = firstDayInSecondWeek + 7 * (week - 2)

    result = [...Array(7)].map((_, index) => {
      return {
        year: year,
        month: month1origin,
        day: firstDayInThisWeek + index,
        dayOfWeek: index,
      } as Day
    })
  }

  return result
}

const convertDateTimeString_ = (year: number, month: number, day: number) => {
  return `${year}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)}`
}
