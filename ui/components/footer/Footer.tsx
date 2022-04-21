import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <LayoutFooter>
      <FooterLinks>
        <FooterLink>
          <TEXTLinks>
            <Link href="/about">Stella Finderについて</Link>
            <Link href="/contact">お問い合わせ</Link>
            <a
              target="_blank"
              href="https://github.com/Ryota0312/Stella-Finder/releases"
              rel="noreferrer"
            >
              リリースノート
            </a>
            <Link href="/license">ライセンス</Link>
          </TEXTLinks>
        </FooterLink>
        <SNSLinks>
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
          <Instagram>
            <Image
              src="/image/instagram-logo.png"
              alt="instagram"
              title="準備中です"
              width={32}
              height={32}
            />
          </Instagram>
        </SNSLinks>
      </FooterLinks>
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

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: min(102px, 30%);
  margin: 0 16px 8px 16px;
`

const TEXTLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 32px;
`

const SNSLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Twitter = styled.div`
  color: white;
  font-size: 10px;
`

const Instagram = styled.div`
  color: white;
  font-size: 10px;
  cursor: not-allowed;
`

const FooterLink = styled.div`
  font-size: 11px;

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
