import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <h2>天体観測スポット</h2>
        <div>以下より天体観測スポットの一覧を閲覧できます。</div>
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
