import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'
import { useAuth } from '../../hooks/useAuth'

export const LoginStatus: React.FC = () => {
  const { logout } = useAuth()
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Status>
      <Link href={'/user/profile/' + data.id}>
        <UserIconWrapper>
          <UserIcon
            src="/image/profile-icon-default.png"
            alt="user icon"
            unoptimized={true}
            width={24}
            height={24}
          />
        </UserIconWrapper>
      </Link>
      <Link href={'/user/profile/' + data.id}>
        <UserName>{data.name}</UserName>
      </Link>
      {data.id != 0 && (
        <LogoutButton type={'button'} onClick={logout}>
          ログアウト
        </LogoutButton>
      )}
      {data.id == 0 && <Link href="/login">ログイン</Link>}
    </Status>
  )
}

const Status = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
`

const UserName = styled.div`
  color: white;
  float: right;
  margin-right: 8px;
  height: 1em;
  cursor: pointer;
`

// スタイルこれでいいかは怪しい
const LogoutButton = styled.a`
  cursor: pointer;
  height: 1em;
`

const UserIconWrapper = styled.div`
  height: 1em;
  margin-right: 8px;
  cursor: pointer;
`

const UserIcon = styled(Image)`
  border-radius: 48px;
  background-color: white;
`
