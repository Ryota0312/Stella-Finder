import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../components/layout'

const About: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>
          Stella Finderについて | 天体観測スポットの検索・情報共有コミュニティ
        </title>
      </Head>

      <main>
        <h2>『Stella Finder』で天体観測スポットを検索＆共有</h2>
        <FeatureIntroduction>
          <FeatureIntroductionContainer>
            <FeatureIntroductionIcon>
              <Image
                src="/image/about-search.png"
                alt="検索する"
                width={64}
                height={64}
              />
            </FeatureIntroductionIcon>
            <FeatureIntroductionText>
              <FeatureIntroductionLabel>検索する</FeatureIntroductionLabel>
              <FeatureIntroductionDescription>
                天体観測スポットと観測レポートの検索ができます。
              </FeatureIntroductionDescription>
            </FeatureIntroductionText>
          </FeatureIntroductionContainer>
          <FeatureIntroductionContainer>
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
                天体観測スポットを登録したり、レビューして情報共有できます。
              </FeatureIntroductionDescription>
            </FeatureIntroductionText>
          </FeatureIntroductionContainer>
        </FeatureIntroduction>
      </main>
    </Layout>
  )
}
export default About

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

const FeatureIntroductionContainer = styled.div`
  display: flex;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
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
