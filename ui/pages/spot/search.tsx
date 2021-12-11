import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout'
import { PrefecturePicker } from '../../components/common/PrefecturePicker'
import { SearchWidget } from '../../components/spot/SearchWidget'

const Search: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>観測スポットを探す</title>
      </Head>

      <main>
        <h2>スポットを探す</h2>
        <h3 id="inDetail">詳細検索</h3>
        <SearchWidget />
        <h3 id="byArea">地域から探す</h3>
        <PrefecturePicker />
      </main>
    </Layout>
  )
}
export default Search
