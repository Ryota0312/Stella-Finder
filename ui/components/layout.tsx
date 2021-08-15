import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { LoginStatus } from './header/loginStatus'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main>
        <LayoutHeader>
          <HeaderP1>
            <HeaderTitle>Stella Finder</HeaderTitle>
            <LoginStatus />
          </HeaderP1>
          <HeaderMenuList>
            <HeaderMenuListItem>
              <Link href="/">Home</Link>
            </HeaderMenuListItem>
            <HeaderMenuListItem>
              <Link href="/spotList">Spot List</Link>
            </HeaderMenuListItem>
          </HeaderMenuList>
        </LayoutHeader>
        <MainContents>{children}</MainContents>
      </main>
    </>
  )
}
export default Layout

const LayoutHeader = styled.header`
  height: 100px;
  background-color: black;
`

const HeaderP1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;
  float: left;
`

const HeaderMenuList = styled.li`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin: 0 8px;
`

const HeaderMenuListItem = styled.ul`
  list-style: none;
  font-size: 18px;
  color: white;
  margin: 0;
  padding: 0 12px;

  a {
    color: white;
  }

  &:hover {
    background-color: white;

    a {
      color: black;
    }
  }
`

const MainContents = styled.div`
  margin: 10px;

  h2 {
    color: green;
  }
`
