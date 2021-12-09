import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'

type LoadingProps = {
  width?: number
  height?: number
  color?: string
}

export const TinyLoading: React.FC<LoadingProps> = (props: LoadingProps) => {
  return (
    <LoadingWithText>
      <ReactLoading
        type="bubbles"
        color={props.color}
        width={props.width}
        height={props.height}
      />
    </LoadingWithText>
  )
}

const LoadingWithText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`

TinyLoading.defaultProps = {
  width: 70,
  height: 70,
  color: 'black',
}
