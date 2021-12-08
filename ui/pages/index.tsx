import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import { PrefecturePicker } from '../components/common/PrefecturePicker'
import { MoonAge } from '../components/moon/MoonAge'
import { ArticleList } from '../components/article/ArticleList'
import { MoonRiseSet } from '../components/moon/MoonRiseSet'

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <MoonInfo>
          <MoonAge />
          <MoonRiseSet />
        </MoonInfo>
        <ArticleList />
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

const MoonInfo = styled.div`
  display: flex;
  gap: 16px;
`
