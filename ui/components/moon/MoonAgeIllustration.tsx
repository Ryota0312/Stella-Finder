import React, { useEffect } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'

type MoonAgeIllustrationProps = {
  moonAge: number
  size: number
}

export const MoonAgeIllustration: React.FC<MoonAgeIllustrationProps> = (
  props,
) => {
  return (
    <Moon size={props.size}>
      <MoonCanvasLayer1 id="a0" />
      <MoonCanvasLayer2 id="a1" />
      <MoonCanvasLayer3 id="a2" />
      <MoonAgeNumber>{props.moonAge}</MoonAgeNumber>
    </Moon>
  )
}

const MOON_SIZE = 100

interface MoonSize {
  size: number
}

const Moon = styled.div<MoonSize>`
  position: relative;
  width: 100px;
  height: ${({ size }) => size}px;
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
