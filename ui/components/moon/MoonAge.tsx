import React, { useEffect } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'

export const MoonAge: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/moonAge', false], fetcher)

  useEffect(() => {
    if (data) drawMoon(data.moon_age)
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame>
      <div>
        <Title>月齢</Title>
        <Moon>
          <MoonCanvasLayer1 id="a0" />
          <MoonCanvasLayer2 id="a1" />
          <MoonCanvasLayer3 id="a2" />
          <MoonAgeNumber>{data.moon_age}</MoonAgeNumber>
        </Moon>
      </div>
    </RoundFrame>
  )
}

const MOON_SIZE = 100

const Title = styled.div`
  font-size: 24px;
`

const Moon = styled.div`
  position: relative;
  width: 100px;
  height: ${MOON_SIZE}px;
  margin: auto;
`

const MoonAgeNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 24px;
`

const MoonCanvasLayer1 = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: ${MOON_SIZE}px;
  height: ${MOON_SIZE}px;
`

const MoonCanvasLayer2 = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: ${MOON_SIZE}px;
  height: ${MOON_SIZE}px;
`

const MoonCanvasLayer3 = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: ${MOON_SIZE}px;
  height: ${MOON_SIZE}px;
`

const pi = Math.PI,
  pi2 = pi * 2,
  topAngle = pi + (pi / 2) * 3,
  bottomAngle = pi + pi / 2,
  halfSize = MOON_SIZE / 2,
  c = [] as Array<HTMLCanvasElement>,
  ctx = [] as Array<CanvasRenderingContext2D>,
  start = [0, topAngle, 0],
  end = [pi2, bottomAngle, pi2]

const drawMoon = (age: number) => {
  for (let i = 0; i < 3; i++) {
    c[i] = document.getElementById(`a${i}`) as HTMLCanvasElement
    c[i].width = MOON_SIZE
    c[i].height = MOON_SIZE
    ctx[i] = c[i].getContext('2d') as CanvasRenderingContext2D
    ctx[i].fillStyle = i === 0 ? '#232323' : '#a4a424'
    ctx[i].arc(halfSize, halfSize, halfSize * 0.95, start[i], end[i])
    ctx[i].fill()
  }

  const r =
    29.530588853 + 2.162e-9 * ((new Date().getTime() - 946727935816) / 315576e5)
  appearance(age, r)
}

const appearance = (age: number, m: number) => {
  const s = Math.cos((pi2 * age) / m),
    s2 = Math.sin((pi2 * age) / m),
    r = Math.abs(halfSize * s)
  c[1].style.transform = `rotate(${s2 > 0 ? 180 : 0}deg)`
  ctx[2].clearRect(0, 0, MOON_SIZE, MOON_SIZE)
  ctx[2].beginPath()
  ctx[2].fillStyle = s > 0 ? '#232323' : '#a4a424'
  ctx[2].arc(halfSize, halfSize, halfSize * 0.95, 0, pi2)
  ctx[2].fill()
  c[2].style.width = `${r * 2}px`
  c[2].style.left = `${halfSize - r}px`
}
