import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { Loading } from '../../components/common/Loading'
import { MoonAgeIllustration } from '../../components/moon/MoonAgeIllustration'
import { PrefectureSelect } from '../../components/search/PrefectureSelect'

const Monthly: React.FC = () => {
  const today = new Date()

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [prefecture, setPrefecture] = useState('')
  let dayCount = -1

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
    }
  }, [prefecture])

  const { fetcher } = useApi()
  const { data, error } = useSWR(
    [
      `/api/moonRiseSetAgeMonthly?pref=${prefecture}&year=${year}&month=${month}`,
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
        <h2>
          {year}年{month}月の月の出・月の入・月齢
        </h2>
        <DisplayWarning>
          ご使用のデバイスの画面サイズでは表示が崩れる可能性があります。ご不便をおかけして申し訳ございません。
          <br />
          画面サイズが小さいデバイスでも正しく表示できるように改修予定ですので、しばらくお待ちください。
        </DisplayWarning>
        <PrefectureSelectorWrapper>
          <div>都道府県</div>
          <PrefectureSelect
            required={false}
            value={prefecture}
            onChange={(v) => setPrefecture(v)}
          />
        </PrefectureSelectorWrapper>
        <CalendarMonthController>
          <button
            onClick={() => {
              if (month == 1) {
                setYear(year - 1)
                setMonth(12)
              } else {
                setMonth(month - 1)
              }
            }}
          >
            前の月
          </button>
          <button
            onClick={() => {
              setYear(today.getFullYear())
              setMonth(today.getMonth() + 1)
            }}
          >
            今月
          </button>
          <button
            onClick={() => {
              if (month == 12) {
                setYear(year + 1)
                setMonth(1)
              } else {
                setMonth(month + 1)
              }
            }}
          >
            次の月
          </button>
        </CalendarMonthController>
        <MoonCalendarOutline>
          <table>
            <thead>
              <tr>
                <th style={{ color: 'red' }}>日</th>
                <th>月</th>
                <th>火</th>
                <th>水</th>
                <th>木</th>
                <th>金</th>
                <th style={{ color: 'blue' }}>土</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, week) => {
                const weekDays = getWeek(year, month, week + 1)
                if (!weekDays.every((d) => d === null)) {
                  return (
                    <tr key={week + 'w'}>
                      {weekDays.map((day, i) => {
                        if (day) {
                          dayCount = dayCount + 1
                          return (
                            <CalendarCell
                              key={`${week}week${i}day`}
                              isHighlight={
                                today.getFullYear() == year &&
                                today.getMonth() + 1 == month &&
                                today.getDate() === day.day
                              }
                            >
                              <CalendarDayNumber>{day.day}</CalendarDayNumber>
                              <MoonAgeIllustration
                                canvasId={`${week}week${i}day`}
                                moonAge={
                                  data.results[dayCount].moonAge.moon_age
                                }
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
                                入:
                                {
                                  data.results[dayCount].riseAndSet.rise_and_set
                                    .moonset_hm
                                }
                              </div>
                            </CalendarCell>
                          )
                        } else {
                          return <td key={`${week}week${i}day`}></td>
                        }
                      })}
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </MoonCalendarOutline>
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
  const lastDayOfMonth = new Date(year, month1origin + 1, 0).getDate()

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
  } else if (firstDayInSecondWeek + 7 * (week - 2) + 6 > lastDayOfMonth) {
    const firstDayInThisWeek = firstDayInSecondWeek + 7 * (week - 2)

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

const CalendarMonthController = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

const CalendarDayNumber = styled.div`
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
  padding-bottom: 8px;
`

const MoonCalendarOutline = styled.div`
  width: 100%;

  table,
  th,
  td {
    border: 1px #ccc solid;
  }

  td {
    padding: 8px;
  }
`

const PrefectureSelectorWrapper = styled.div`
  margin-bottom: 16px;
`

const CalendarCell = styled.td<{ isHighlight: boolean }>`
  background-color: ${({ isHighlight }) =>
    isHighlight ? 'rgba(255, 0, 0, 0.3)' : 'transparent'};
`

const DisplayWarning = styled.div`
  @media (min-width: 900px) {
    display: none;
  }

  border: 1px solid red;
  border-radius: 8px;
  background-color: #ff9d9d;
  padding: 16px;
  margin: 8px 0;
  color: gray;
  width: 100vw;
`
