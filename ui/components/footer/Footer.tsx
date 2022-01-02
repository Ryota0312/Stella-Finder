import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

export const Footer: React.FC = () => {
  return (
    <LayoutFooter>
      <Twitter>
        <a
          href="https://twitter.com/stella_finder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/image/twitter-logo.png"
            alt="twitter"
            width={32}
            height={26}
          />
        </a>
      </Twitter>
      <CopyRight>Copyright © 2022 Ryota Nishi All Rights Reserved.</CopyRight>
    </LayoutFooter>
  )
}

const LayoutFooter = styled.footer`
  height: auto;
  background-color: black;
  padding: 16px;

  a {
    color: white;
  }
`

const Twitter = styled.div`
  color: white;
  font-size: 10px;
  text-align: center;
  margin-bottom: 8px;
`

const CopyRight = styled.div`
  color: white;
  font-size: 10px;
  text-align: center;
`
