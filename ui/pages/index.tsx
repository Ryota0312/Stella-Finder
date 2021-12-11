import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Layout from '../components/layout'
import { MoonAge } from '../components/moon/MoonAge'
import { ArticleListWidget } from '../components/article/ArticleListWidget'
import { MoonRiseSetWithPrefectureSelect } from '../components/moon/MoonRiseSetWithPrefectureSelect'

const RecommendSpotList = dynamic(
  () => import('../components/spot/RecommendSpotList'),
  { ssr: false },
)

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Stella Finder</title>
      </Head>

      <main>
        <MoonInfo>
          <MoonAge />
          <MoonRiseSetWithPrefectureSelect />
          <ArticleListWidget />
        </MoonInfo>
        <RecommendSpotList key="all" showAllPrefecture={true} />
        <RecommendSpotList key="pref" showAllPrefecture={false} />
      </main>
    </Layout>
  )
}
export default Home

const MoonInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  gap: 16px;
  margin: 32px 0 16px 0;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;

    ul {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`
