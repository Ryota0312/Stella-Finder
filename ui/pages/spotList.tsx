import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import Layout from '../components/layout'
import { useApi } from '../hooks/useApi'

const SpotList: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/spot/list', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>Spot List</title>
      </Head>

      <main>
        <h2>Spot List</h2>
        <div>
          {data.map((d: any) => (
            <li key={d.name}>
              <Spot spotName={d.name} />
            </li>
          ))}
        </div>
      </main>
    </Layout>
  )
}
export default SpotList

const Spot: React.FC<{ spotName: any }> = (props) => {
  return <ul>{props.spotName}</ul>
}
