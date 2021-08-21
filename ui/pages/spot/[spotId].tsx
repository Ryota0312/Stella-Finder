import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi'
import Layout from '../../components/layout'

const Spot: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/spots' + '?id=' + spotId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>Spot Detail</title>
      </Head>

      <main>
        <h2>spot detail</h2>
        <div>{data.name}</div>
      </main>
    </Layout>
  )
}
export default Spot
