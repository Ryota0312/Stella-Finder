import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { UserImageList } from '../../../components/user/UserImageList'
import { UserProfileIcon } from '../../../components/user/UserProfileIcon'

const User: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query

  const { fetcher } = useApi()
  const { data, error } = useSWR(
    userId ? ['/api/profile' + '?id=' + userId, false] : null,
    fetcher,
  )

  const [isLoginUser, setIsLoginUser] = useState(false)
  useEffect(() => {
    fetcher('/api/loginUser', false).then((res) => {
      setIsLoginUser(res.id === Number(userId))
    })
  }, [userId])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>{data.user_name}</title>
      </Head>

      <main>
        <h2>{data.name}</h2>
        <IconAndDescription>
          <UserProfileIcon isLoginUser={isLoginUser} icon={data.icon} />
          <DescriptionWrapper>
            <Description>{data.description}</Description>
            {isLoginUser && data.description && (
              <DescriptionEditButton>
                <Link href={'/settings/user'}>編集</Link>
              </DescriptionEditButton>
            )}
            {isLoginUser && !data.description && (
              <Link href={'/settings/user'}>自己紹介を入力</Link>
            )}
          </DescriptionWrapper>
        </IconAndDescription>
        <h3>投稿写真一覧</h3>
        <UserImageList userId={Number(userId)} />
      </main>
    </Layout>
  )
}
export default User

const IconAndDescription = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const DescriptionWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  width: 100%;

  @media screen and (max-width: 600px) {
    width: auto;
  }
`

const Description = styled.div`
  white-space: pre-line;
`

const DescriptionEditButton = styled.div`
  margin-top: 16px;
  text-align: right;
`
