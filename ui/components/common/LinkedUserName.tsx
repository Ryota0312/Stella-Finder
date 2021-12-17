import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'
import { UnoptimizedImage } from './UnoptimizedImage'
import { TinyLoading } from './TinyLoading'

export type LinkedUserNameProps = {
  userId: number
  showIcon?: boolean
}

export const LinkedUserName: React.FC<LinkedUserNameProps> = (
  props: LinkedUserNameProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    props.userId ? ['/api/profile?id=' + props.userId, false] : null,
    fetcher,
  )

  if (error) return <div>error</div>
  if (!data) return <TinyLoading />

  return (
    <div style={{ width: 'fit-content' }}>
      <Link href={'/user/profile/' + props.userId}>
        <IconAndName>
          {props.showIcon && (
            <>
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
                  borderRadius={'50%'}
                  fetchedImageSize={300}
                />
              )}
            </>
          )}
          <div>{data.name}</div>
        </IconAndName>
      </Link>
    </div>
  )
}

const IconAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  color: #0070f3;
  text-decoration: none;
  padding-right: 16px;
`

const UserIconDefault = styled(Image)`
  border-radius: 48px;
  background-color: white;
`

const UserIcon = styled(UnoptimizedImage)`
  border-radius: 48px;
  background-color: white;
`
