import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { LoginStatus } from './LoginStatus'

export const GlobalHeader: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)

  const headerMenuItems = [
    { label: 'トップ', href: '/' },
    { label: '観測スポット', href: '/spot/list' },
  ]

  return (
    <LayoutHeader>
      <HeaderContent>
        <HeaderMenuOpenButton
          onClick={() => {
            setIsOpenUserMenu(false)
            setIsOpenMenu(!isOpenMenu)
          }}
        >
          <Image
            src="/image/header-menu.png"
            alt="open menu"
            width={24}
            height={24}
          />
        </HeaderMenuOpenButton>
        <HeaderP1>
          <Link href={'/'}>
            <HeaderTitle>Stella Finder</HeaderTitle>
          </Link>
          <LoginStatus
            isOpen={isOpenUserMenu}
            onClickUserMenu={() => {
              setIsOpenMenu(false)
              setIsOpenUserMenu(!isOpenUserMenu)
            }}
          />
        </HeaderP1>
      </HeaderContent>
      <HeaderMenuList>
        {headerMenuItems.map((menu) => (
          <HeaderMenuListItem key={menu.label}>
            <Link href={menu.href}>{menu.label}</Link>
          </HeaderMenuListItem>
        ))}
      </HeaderMenuList>
      <MobileHeaderMenuList isOpen={isOpenMenu}>
        {headerMenuItems.map((menu) => (
          <HeaderMenuListItem key={menu.label}>
            <Link href={menu.href}>{menu.label}</Link>
          </HeaderMenuListItem>
        ))}
      </MobileHeaderMenuList>
    </LayoutHeader>
  )
}

const LayoutHeader = styled.header`
  height: auto;
  background-color: black;
  padding-bottom: 8px;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const HeaderP1 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
`

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;
  float: left;
  cursor: pointer;
`

const HeaderMenuList = styled.li`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  margin: 0 8px;

  @media screen and (max-width: 600px) {
    display: none;
  }
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

const HeaderMenuOpenButton = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  padding: 0 0 0 16px;

  &:hover {
    background: transparent;
  }

  @media screen and (min-width: 601px) {
    display: none;
  }
`

const MobileHeaderMenuList = styled.li<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 8px;
}
`
