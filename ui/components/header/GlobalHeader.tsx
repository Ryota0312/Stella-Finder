import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { LoginStatus } from './LoginStatus'

export const GlobalHeader: React.FC = () => {
  const router = useRouter()

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)

  const headerMenuItems = [
    { label: 'トップ', href: '/' },
    { label: 'News', href: '/article/list' },
    { label: 'スポットを探す', href: '/spot/search' },
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
            <HeaderTitleLink>
              <HeaderSubTitle>
                天体観測スポットの検索・情報共有コミュニティ
              </HeaderSubTitle>
              <HeaderTitle>Stella Finder</HeaderTitle>
            </HeaderTitleLink>
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
            <HeaderMenuButton onClick={() => router.push(menu.href)}>
              {menu.label}
            </HeaderMenuButton>
          </HeaderMenuListItem>
        ))}
      </HeaderMenuList>
      <MobileHeaderMenuList isOpen={isOpenMenu}>
        {headerMenuItems.map((menu) => (
          <HeaderMenuListItem key={menu.label}>
            <HeaderMenuButton onClick={() => router.push(menu.href)}>
              {menu.label}
            </HeaderMenuButton>
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
  align-items: flex-start;
  margin-top: 16px;
`

const HeaderP1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 0 16px 8px 16px;
  width: 100%;
`

const HeaderTitleLink = styled.div`
  margin-left: 8px;
`

const HeaderSubTitle = styled.div`
  color: white;
  font-size: 8px;
`

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;
  float: left;
  cursor: pointer;

  @media screen and (max-width: 380px) {
    font-size: 24px;
  }
`

const HeaderMenuList = styled.li`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const HeaderMenuListItem = styled.ul`
  list-style: none;
  color: white;
  margin: 0;
  padding: 0;
`

const HeaderMenuButton = styled.button`
  font-size: 18px;
  border: none;
  border-radius: 0;
  color: white;
  background-color: transparent;
  line-height: 1.5;
  padding: 4px 16px;
  margin: 0;

  @media screen and (max-width: 600px) {
    width: 100%;
    text-align: left;
  }

  &:hover,
  &:focus {
    color: black;
    background-color: white;
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
