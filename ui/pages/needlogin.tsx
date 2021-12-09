import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'
import Layout from '../components/layout'
import { useApi } from '../hooks/useApi'
import { Loading } from '../components/common/Loading'

const SampleLoginNecessaryPage: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <h2>このページはログインが必要です</h2>
      </main>
    </Layout>
  )
}
export default SampleLoginNecessaryPage
