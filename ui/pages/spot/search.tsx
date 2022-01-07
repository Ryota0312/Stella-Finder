import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { PrefecturePicker } from '../../components/search/PrefecturePicker'
import { SearchWidget } from '../../components/spot/SearchWidget'
import RecommendSpotList from '../../components/spot/RecommendSpotList'

const Search: React.FC = () => {
  const router = useRouter()
  const { scroll } = router.query

  const inDetailRef = useRef<HTMLDivElement>(null)
  const byAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    switch (scroll) {
      case 'inDetail':
        if (inDetailRef.current) {
          inDetailRef.current.scrollIntoView()
        }
        break
      case 'byArea':
        if (byAreaRef.current) {
          byAreaRef.current.scrollIntoView()
        }
        break
    }
  }, [scroll])

  return (
    <Layout>
      <Head>
        <title>天体観測スポットを探す | Stella Finder</title>
      </Head>

      <main>
        <h2>スポットを探す</h2>
        <RecommendSpotList showAllPrefecture={true} />
        <h3 id="inDetail" ref={inDetailRef}>
          詳細検索
        </h3>
        <SearchWidget />
        <h3 id="byArea" ref={byAreaRef}>
          地域から探す
        </h3>
        <PrefecturePicker />
      </main>
    </Layout>
  )
}
export default Search
