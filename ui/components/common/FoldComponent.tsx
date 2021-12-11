import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

export type FoldComponentProps = {
  children: React.ReactNode
  labelOpen?: string
  labelClose?: string
}

export const FoldComponent: React.FC<FoldComponentProps> = (
  props: FoldComponentProps,
) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <ButtonAndLabel>
        {isOpen && (
          <>
            <FoldButton onClick={() => setIsOpen(false)}>
              <Image src="/image/close.png" alt="fold" width={32} height={32} />
            </FoldButton>
            <div>{props.labelClose}</div>
          </>
        )}
        {!isOpen && (
          <>
            <FoldButton onClick={() => setIsOpen(true)}>
              <Image src="/image/open.png" alt="open" width={32} height={32} />
            </FoldButton>
            <div>{props.labelOpen}</div>
          </>
        )}
      </ButtonAndLabel>
      {isOpen && props.children}
    </div>
  )
}

const FoldButton = styled.button`
  border: none;
  background: none;
`

const ButtonAndLabel = styled.div`
  display: flex;
  align-items: center;
  color: rgb(75, 75, 75);
`
