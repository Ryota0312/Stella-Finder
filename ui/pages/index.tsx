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
        <h2>index page</h2>
        <div>
          <Link href={'/spot/list'}>
            <a>Watching Spot List</a>
          </Link>
        </div>
      </main>
    </Layout>
  )
}
export default Home
