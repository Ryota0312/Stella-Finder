import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { UserImageList } from '../../../components/user/UserImageList'

const User: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query

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
        <Link href={'/settings/user'}>編集</Link>
        <div>メールアドレス: {data.mail_address}</div>
        <h3>投稿写真一覧</h3>
        <UserImageList userId={Number(userId)} />
      </main>
    </Layout>
  )
}
export default User
