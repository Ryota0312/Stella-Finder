import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import { Link as Scroll } from 'react-scroll'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

const About: React.FC = () => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>
          Stella Finderについて | 天体観測スポットの検索・情報共有コミュニティ
        </title>
      </Head>

      <main>
        <CoverImageAndTitle>
          <TitleAndDescription>
            <h2>SEARCH and SHARE Starry Sky</h2>
            <div>『Stella Finder』で天体観測スポットを検索＆共有</div>
          </TitleAndDescription>
          <Image
            src="/image/about-cover-photo.jpg"
            alt=""
            width={1680}
            height={945}
            placeholder="blur"
            blurDataURL="/image/about-cover-photo-blur.jpg"
          />
        </CoverImageAndTitle>
        <FeatureIntroduction>
          <FeatureIntroductionContainer
            to="search"
            smooth={true}
            duration={600}
            offset={-30}
          >
            <FeatureIntroductionIcon>
              <Image
                src="/image/about-search.png"
                alt="探す"
                width={64}
                height={64}
              />
            </FeatureIntroductionIcon>
            <FeatureIntroductionText>
              <FeatureIntroductionLabel>探す</FeatureIntroductionLabel>
              <FeatureIntroductionDescription>
                Stella Finderで天体観測スポットを探しましょう。
                <br />
                キーワードや地域、みんなの評価から天体観測スポットを検索できます。
                スポットの評価は、「空の暗さ」「見晴らし」「安全性」の3項目で5段階の評価が行われます。
              </FeatureIntroductionDescription>
            </FeatureIntroductionText>
          </FeatureIntroductionContainer>
          <FeatureIntroductionContainer
            to="share"
            smooth={true}
            duration={600}
            offset={-30}
          >
            <FeatureIntroductionIcon>
              <Image
                src="/image/about-share.png"
                alt="共有する"
                width={64}
                height={64}
              />
            </FeatureIntroductionIcon>
            <FeatureIntroductionText>
              <FeatureIntroductionLabel>共有する</FeatureIntroductionLabel>
              <FeatureIntroductionDescription>
                天体観測スポットを登録したり、スポットのレビューを投稿して情報を共有しましょう。
                <br />
                まだ知られていない天体観測スポットを新たに登録したり、スポットのレビューや観測レポートを投稿して、
                これから天体観測をしようとしている人を手助けしましょう。
              </FeatureIntroductionDescription>
            </FeatureIntroductionText>
          </FeatureIntroductionContainer>
        </FeatureIntroduction>
        <FeatureIntroductionTitle> - 機能紹介 - </FeatureIntroductionTitle>
        <h3 id="search">SEARCH - 探す -</h3>
        <TwoColumn>
          <Image
            src="/image/about-search-sample.png"
            alt="検索画面"
            width={560}
            height={478}
            placeholder="blur"
            blurDataURL="/image/about-search-sample-blur.jpg"
          />
          <FeatureLinkList>
            <FeatureLinkListItem onClick={() => router.push('/spot/search')}>
              <div>▶ スポットを検索する</div>
            </FeatureLinkListItem>
          </FeatureLinkList>
        </TwoColumn>
        <h3 id="share">SHARE - 共有する -</h3>
        <TwoColumn>
          <Image
            src="/image/about-share-sample.png"
            alt="検索画面"
            width={560}
            height={478}
            placeholder="blur"
            blurDataURL="/image/about-share-sample-blur.jpg"
          />
          <FeatureLinkList>
            <FeatureLinkListItem onClick={() => router.push('/spot/register')}>
              <div>▶ スポットを登録する</div>
            </FeatureLinkListItem>
            <FeatureLinkListItem onClick={() => router.push('/report/add')}>
              <div>▶ 観測レポートを投稿する</div>
            </FeatureLinkListItem>
          </FeatureLinkList>
        </TwoColumn>
      </main>
    </Layout>
  )
}
export default About

const CoverImageAndTitle = styled.div`
  position: relative;
`

const TitleAndDescription = styled.div`
  position: absolute;
  bottom: 15%;
  left: 5%;
  z-index: 100;
  color: white;
  opacity: 0.95;

  h2 {
    color: white;
    opacity: 0.85;
  }

  @media screen and (max-width: 640px) {
    font-size: 8px;
  }
`

const FeatureIntroductionTitle = styled.h2`
  text-align: center;
  margin: 140px 0 80px 0;
`

const FeatureIntroduction = styled.div`
  @media screen and (min-width: 640px) {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 90%;
  }
`

const FeatureIntroductionContainer = styled(Scroll)`
  display: flex;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  margin-top: 16px;
`

const FeatureIntroductionIcon = styled.div`
  min-width: 64px;
  min-height: 64px;
`

const FeatureIntroductionText = styled.div`
  margin-left: 32px;
`

const FeatureIntroductionLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #313131;
`

const FeatureIntroductionDescription = styled.div`
  margin-top: 8px;
  color: #313131;
`

const TwoColumn = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 96px;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`

const FeatureLinkList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`

const FeatureLinkListItem = styled.li`
  list-style: none;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;

  &:hover {
    background-color: #aaa;
    border: 2px solid #ffa216;
  }
`
