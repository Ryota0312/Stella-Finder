import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

type PrefectureButtonProps = {
  prefecture: string
  onDelete: () => void
}

export const PrefectureButton: React.FC<PrefectureButtonProps> = (
  props: PrefectureButtonProps,
) => {
  return (
    <ButtonWrapper>
      <DeleteButton onClick={() => props.onDelete()}>✕</DeleteButton>
      <Link href={'/spot/list?pref=' + props.prefecture}>
        {props.prefecture}
      </Link>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: inline-block;
  background-color: #feffb6;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0 8px 8px 0;
  padding: 0 8px;
`

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  padding: 0 8px 0 4px;
`
