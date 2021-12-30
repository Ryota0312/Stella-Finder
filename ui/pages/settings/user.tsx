import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { UserSettingsForm } from '../../components/settings/UserSettingsForm'
import { Loading } from '../../components/common/Loading'

const User: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>プロフィールを編集 | Stella Finder</title>
      </Head>

      <main>
        <UserSettingsForm />
      </main>
    </Layout>
  )
}
export default User
