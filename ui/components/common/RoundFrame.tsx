import React from 'react'
import styled from 'styled-components'

export type RoundFrameProps = {
  title?: string
  children: React.ReactNode
}

export const RoundFrame: React.FC<RoundFrameProps> = (
  props: RoundFrameProps,
) => {
  return (
    <Frame>
      {props.title && <Title>{props.title}</Title>}
      {props.children}
    </Frame>
  )
}

const Title = styled.div`
  position: absolute;
  top: -16px;
  left: 16px;
  font-size: 24px;
  background-color: white;
  color: #5e2323;
`

const Frame = styled.div`
  flex: auto;
  position: relative;
  border: 1px solid #ccc;
  padding: 24px 16px 16px 16px;
  border-radius: 8px;
  margin: 24px 0;
`
