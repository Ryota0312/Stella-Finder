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
    <IconAndName>
      {props.showIcon && (
        <>
          {data.icon === '' && (
            <UserIconDefault
              src="/image/profile-icon-default.png"
              alt="user icon"
              width={32}
              height={32}
            />
          )}
          {data.icon !== '' && (
            <UserIcon
              fileKey={data.icon}
              width="32px"
              height="32px"
              objectFit={'cover'}
              borderRadius={'50%'}
              fetchedImageSize={300}
            />
          )}
        </>
      )}
      <Link href={'/user/profile/' + props.userId}>{data.name}</Link>
    </IconAndName>
  )
}

const IconAndName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const UserIconDefault = styled(Image)`
  border-radius: 48px;
  background-color: white;
`

const UserIcon = styled(UnoptimizedImage)`
  border-radius: 48px;
  background-color: white;
`
