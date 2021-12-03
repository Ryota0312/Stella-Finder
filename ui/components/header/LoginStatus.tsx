import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi'
import { useAuth } from '../../hooks/useAuth'
import { UnoptimizedImage } from '../common/UnoptimizedImage'
import { LoginUserOnly } from '../common/LoginUserOnly'

type LoginStatusProps = {
  isOpen: boolean
  onClickUserMenu: (isOpen: boolean) => void
}

export const LoginStatus: React.FC<LoginStatusProps> = (
  props: LoginStatusProps,
) => {
  const router = useRouter()
  const { logout } = useAuth()
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Status>
      <LoginUserOnly>
        <DesktopUserMenu>
          <Link href={'/user/profile/' + data.id}>
            <UserIconAndName>
              {data.icon === '' && (
                <UserIconDefault
                  src="/image/profile-icon-default.png"
                  alt="user icon"
                  width={24}
                  height={24}
                />
              )}
              {data.icon !== '' && (
                <UserIcon
                  fileKey={data.icon}
                  width="24px"
                  height="24px"
                  objectFit={'cover'}
                />
              )}
              <UserName>{data.name}</UserName>
            </UserIconAndName>
          </Link>
          {data.id != 0 && (
            <LogoutButton type={'button'} onClick={logout}>
              ログアウト
            </LogoutButton>
          )}
        </DesktopUserMenu>
        <MobileUserMenu>
          <MobileUserMenuButton
            onClick={() => props.onClickUserMenu(!props.isOpen)}
          >
            {data.icon === '' && (
              <UserIconDefault
                src="/image/profile-icon-default.png"
                alt="user icon"
                width={48}
                height={48}
              />
            )}
            {data.icon !== '' && (
              <UserIcon
                fileKey={data.icon}
                width="48px"
                height="48px"
                objectFit={'cover'}
              />
            )}
            <div style={{ color: 'white' }}>▼</div>
          </MobileUserMenuButton>
          <MobileUserMenuList isOpen={props.isOpen}>
            <MobileUserMenuListItem
              onClick={() => router.push('/user/profile/' + data.id)}
            >
              マイページ
            </MobileUserMenuListItem>
            <MobileUserMenuListItem onClick={logout}>
              ログアウト
            </MobileUserMenuListItem>
          </MobileUserMenuList>
        </MobileUserMenu>
      </LoginUserOnly>
      {data.id == 0 && (
        <LoginButton onClick={() => router.push('/login')}>
          ログイン
        </LoginButton>
      )}
    </Status>
  )
}

const Status = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;

  @media screen and (max-width: 600px) {
    display: block;
    text-align: right;
  }
`

const UserName = styled.div`
  color: white;
  float: right;
  margin-right: 8px;
  height: 1em;
  cursor: pointer;
`

// スタイルこれでいいかは怪しい
const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  line-height: 1em;

  &:hover,
  &:focus {
    background-color: #ccc;
    color: black;
  }
`

const LoginButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 8px;
  margin: 8px;
  line-height: 1em;

  &:hover,
  &:focus {
    background-color: #ccc;
    color: black;
  }
`

const UserIconAndName = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`

const UserIconDefault = styled(Image)`
  border-radius: 48px;
  background-color: white;
`

const UserIcon = styled(UnoptimizedImage)`
  border-radius: 48px;
  background-color: white;
`

const DesktopUserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const MobileUserMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (min-width: 601px) {
    display: none;
  }
`

const MobileUserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;

  &:hover {
    background: transparent;
  }
`

const MobileUserMenuList = styled.li<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
`

const MobileUserMenuListItem = styled.ul`
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
