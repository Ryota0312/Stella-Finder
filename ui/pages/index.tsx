import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../components/layout'
import { MoonAge } from '../components/moon/MoonAge'
import { ArticleListWidget } from '../components/article/ArticleListWidget'
import { MoonRiseSetWithPrefectureSelect } from '../components/moon/MoonRiseSetWithPrefectureSelect'
import { RoundFrame } from '../components/common/RoundFrame'

const RecommendSpotList = dynamic(
  () => import('../components/spot/RecommendSpotList'),
  { ssr: false },
)

const Home: React.FC = () => {
  const router = useRouter()

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
        <RoundFrame title="観測スポットを探す">
          <SearchMenuButtons>
            <Button onClick={() => router.push('/spot/search#byArea')}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/search-area.png'}
                  alt={'Edit spot information'}
                  width={48}
                  height={48}
                />
                <div>地域から探す</div>
              </ButtonInnerWithImage>
            </Button>
            <Button onClick={() => router.push('/spot/search#inDetail')}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/search-detail.png'}
                  alt={'Edit spot information'}
                  width={48}
                  height={48}
                />
                <div>詳細検索</div>
              </ButtonInnerWithImage>
            </Button>
          </SearchMenuButtons>
        </RoundFrame>
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

    div:last-child {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`

const SearchMenuButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const Button = styled.button`
  font-size: 32px;
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 16px;
  color: gray;
`
