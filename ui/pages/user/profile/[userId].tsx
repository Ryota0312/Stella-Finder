import React, { useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { UserImageList } from '../../../components/user/UserImageList'
import { UserIconEditDialog } from '../../../components/settings/UserIconEditDialog'

const User: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query

  const [isIconEditDialogOpen, setIsIconEditDialogOpen] = useState(false)

  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/user/profile' + '?id=' + userId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>{data.user_name}</title>
      </Head>

      <main>
        <h2>{data.user_name}</h2>
        <UserIconWrapper>
          <UserIcon
            src="/image/profile-icon-default.png"
            alt="user icon"
            width={128}
            height={128}
          />
          <UserIconEditButton onClick={() => setIsIconEditDialogOpen(true)}>
            <Image
              src="/image/profile-icon-setting.png"
              alt="edit user icon"
              width={24}
              height={24}
            />
          </UserIconEditButton>
        </UserIconWrapper>
        <UserIconEditDialog
          userId={Number(userId)}
          isOpen={isIconEditDialogOpen}
          closeDialog={() => setIsIconEditDialogOpen(false)}
        />
        <Link href={'/settings/user'}>編集</Link>
        <div>メールアドレス: {data.mail_address}</div>
        <h3>投稿写真一覧</h3>
        <UserImageList userId={Number(userId)} />
      </main>
    </Layout>
  )
}
export default User

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
