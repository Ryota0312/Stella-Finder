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
      {isOpen && (
        <FoldButton onClick={() => setIsOpen(false)}>
          <Image src="/image/close.png" alt="fold" width={32} height={32} />
          <div>{props.labelClose}</div>
        </FoldButton>
      )}
      {!isOpen && (
        <FoldButton onClick={() => setIsOpen(true)}>
          <Image src="/image/open.png" alt="open" width={32} height={32} />
          <div>{props.labelOpen}</div>
        </FoldButton>
      )}

      {isOpen && props.children}
    </div>
  )
}

const FoldButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
`
