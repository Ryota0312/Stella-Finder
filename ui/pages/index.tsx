import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import { PrefecturePicker } from '../components/common/PrefecturePicker'

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <h2>天体観測スポットを探す</h2>
        <PrefecturePicker />
        <div>
          <Link href={'/spot/list'}>
            <a>一覧を見る</a>
          </Link>
        </div>
      </main>
    </Layout>
  )
}
export default Home
