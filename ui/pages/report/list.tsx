import React from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../../components/common/TinyLoading'

const List: React.FC = () => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/report/list', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <Layout>
      <Head>
        <title>観測レポート一覧 | Stella Finder</title>
      </Head>

      <main>
        <h2>観測レポート</h2>
        <ul>
          {data.map((d: any) => (
            <li key={d.id}>
              <Link href={'/report/' + d.id + '/show'}>{d.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}
export default List
