import React, { useEffect } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'
import { MoonAgeIllustration } from './MoonAgeIllustration'

const MOON_SIZE = 100

export const MoonAge: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/moonAge', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame>
      <div>
        <Title>月齢</Title>
        <MoonAgeIllustration
          canvasId={'MoonAge'}
          moonAge={data.moon_age}
          size={MOON_SIZE}
        />
      </div>
    </RoundFrame>
  )
}

const Title = styled.div`
  font-size: 24px;
`
