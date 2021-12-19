import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export const Footer: React.FC = () => {
  return (
    <LayoutFooter>
      <CopyRight>Copyright © 2021 Ryota Nishi All Rights Reserved.</CopyRight>
    </LayoutFooter>
  )
}

const LayoutFooter = styled.header`
  height: auto;
  background-color: black;
  padding: 16px;

  a {
    color: white;
  }
`

const CopyRight = styled.div`
  color: white;
  font-size: 10px;
  text-align: center;
`
