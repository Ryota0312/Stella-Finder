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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #feffb6;
  line-height: 1em;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 4px;
  margin: 0 8px 8px 0;
`

const DeleteButton = styled.button`
  background: transparent;
  border: none;
`
