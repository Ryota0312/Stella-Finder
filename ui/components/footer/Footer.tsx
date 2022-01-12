import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <LayoutFooter>
      <Links>
        <FooterLink>
          <Link href="/about">Stella Finderについて</Link>
        </FooterLink>
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
      </Links>
      <CopyRight>
        Copyright © 2021-2022 Ryota Nishi All Rights Reserved.
      </CopyRight>
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

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: min(138px, 30%);
  margin-bottom: 8px;
`

const Twitter = styled.div`
  color: white;
  font-size: 10px;
`

const FooterLink = styled.div`
  font-size: 10px;

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`

const CopyRight = styled.div`
  color: white;
  font-size: 10px;
  text-align: center;
`
