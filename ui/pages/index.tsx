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
          <ArticleList />
        </MoonInfo>
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
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  gap: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;

    ul {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`
