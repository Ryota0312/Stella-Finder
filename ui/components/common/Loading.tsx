import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'

type LoadingProps = {
  width?: number
  height?: number
  color?: string
}

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  return (
    <LoadingWithText>
      <ReactLoading
        type="bars"
        color={props.color}
        width={props.width}
        height={props.height}
      />
      <LoadingText>Loading...</LoadingText>
    </LoadingWithText>
  )
}

const LoadingWithText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const LoadingText = styled.div`
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  margin: -8px;
`

Loading.defaultProps = {
  width: 100,
  height: 100,
  color: 'black',
}
