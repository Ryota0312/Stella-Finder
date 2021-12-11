import Head from 'next/head'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { GridList, GridListItemData } from '../../components/common/GridList'
import { LoginUserOnly } from '../../components/common/LoginUserOnly'
import { Loading } from '../../components/common/Loading'
import { SearchWidget } from '../../components/spot/SearchWidget'

type SpotListItem = {
  id: number
  name: string
  coverImage: string
  avgTotalPoint: number
  reviewCount: number
}

const List: React.FC = () => {
  const router = useRouter()
  const { pref, order } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/' + buildUrl_(pref, order), false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>スポット一覧</title>
      </Head>

      <main>
        <h2>スポット一覧</h2>
        <SearchWidget
          prefecture={pref ? String(pref) : ''}
          order={order ? String(order) : ''}
        />
        <LoginUserOnly>
          <Link href={'/spot/register'}>スポット登録</Link>
        </LoginUserOnly>
        {data.length === 0 && <div>スポットが登録されていません</div>}
        {data.length > 0 && (
          <GridList data={convertToGridItem(data)} link="spot/detail" />
        )}
      </main>
    </Layout>
  )
}
export default List

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return {
      id: spot.id,
      title: spot.name,
      coverImage: spot.coverImage,
      avgTotalPoint: spot.avgTotalPoint,
      reviewCount: spot.reviewCount,
    } as GridListItemData
  })
}

const buildUrl_ = (
  pref: string | string[] | undefined,
  order: string | string[] | undefined,
) => {
  const params = []
  if (pref) {
    params.push('pref=' + pref)
  }
  if (order) {
    params.push('order=' + order)
  }

  if (params.length === 0) {
    return '/spot/list'
  } else {
    return '/spot/list?' + params.join('&')
  }
}
