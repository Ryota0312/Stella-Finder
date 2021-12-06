import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import { PrefecturePicker } from '../components/common/PrefecturePicker'
import { MoonAge } from '../components/moon/MoonAge'

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <div>本日の月齢</div>
        <MoonAge />
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
