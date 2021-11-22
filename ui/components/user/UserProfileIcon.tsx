import useSWR from 'swr'
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'
import { UnoptimizedImage } from '../common/UnoptimizedImage'
import { UserIconEditDialog } from '../settings/UserIconEditDialog'

type UserIconProps = {
  isLoginUser: boolean
  icon: string
}

export const UserProfileIcon: React.FC<UserIconProps> = (
  props: UserIconProps,
) => {
  const [isIconEditDialogOpen, setIsIconEditDialogOpen] = useState(false)

  const fetcher = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <UserIconWrapper>
        {props.icon === '' && (
          <UserIcon
            src="/image/profile-icon-default.png"
            alt="user icon"
            width={128}
            height={128}
          />
        )}
        {props.icon !== '' && (
          <UnoptimizedImage fileKey={props.icon} width="128px" height="128px" />
        )}

        {props.isLoginUser && (
          <UserIconEditButton onClick={() => setIsIconEditDialogOpen(true)}>
            <Image
              src="/image/profile-icon-setting.png"
              alt="edit user icon"
              width={24}
              height={24}
            />
          </UserIconEditButton>
        )}
      </UserIconWrapper>
      {props.isLoginUser && (
        <UserIconEditDialog
          isOpen={isIconEditDialogOpen}
          closeDialog={() => setIsIconEditDialogOpen(false)}
        />
      )}
    </>
  )
}

const UserIconWrapper = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
`

const UserIcon = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
`

const UserIconEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
`
