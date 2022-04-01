import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import { Link as Scroll } from 'react-scroll'
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
                天体観測スポットを登録したり、スポットのレビューをして情報を共有できます。
                <br />
                まだまだ知られていない天体観測スポットを新たに登録したり、スポットのレビューや観測レポートを投稿して、
                これから天体観測をしようとしている人を手助けしましょう。
              </FeatureIntroductionDescription>
            </FeatureIntroductionText>
          </FeatureIntroductionContainer>
        </FeatureIntroduction>
        <h3 id="search">探す</h3>
        <ul>
          <li>
            <Link href="/spot/search">スポット検索</Link>
          </li>
        </ul>
        <h3 id="share">共有する</h3>
        <ul>
          <li>
            <Link href="/spot/register">スポット登録</Link>
          </li>
          <li>
            <Link href="/report/add">観測レポート投稿</Link>
          </li>
        </ul>
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

const FeatureIntroductionContainer = styled(Scroll)`
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
