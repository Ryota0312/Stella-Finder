import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { GridList, GridListItemData } from '../../components/common/GridList'
import { LoginUserOnly } from '../../components/common/LoginUserOnly'
import { Loading } from '../../components/common/Loading'
import { FoldComponent } from '../../components/common/FoldComponent'
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
  const { name, pref, order, total, darkness, view, safety } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    [
      '/api/' + buildUrl_(name, pref, order, total, darkness, view, safety),
      false,
    ],
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
        <LoginUserOnly>
          <Link href={'/spot/register'}>スポット登録</Link>
        </LoginUserOnly>
        <FoldComponent labelOpen="検索条件を変更する" labelClose="閉じる">
          <SearchWidget
            name={name ? String(name) : undefined}
            prefectures={pref ? String(pref).split(' ') : undefined}
            order={order ? String(order).split(' ').join('+') : undefined}
            total={total ? Number(total) : undefined}
            darkness={darkness ? Number(darkness) : undefined}
            view={view ? Number(view) : undefined}
            safety={safety ? Number(safety) : undefined}
          />
        </FoldComponent>
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
  name: string | string[] | undefined,
  pref: string | string[] | undefined,
  order: string | string[] | undefined,
  total: string | string[] | undefined,
  darkness: string | string[] | undefined,
  view: string | string[] | undefined,
  safety: string | string[] | undefined,
) => {
  const params = []
  if (name) {
    params.push('name=' + name)
  }
  if (pref) {
    params.push('pref=' + pref)
  }
  if (order) {
    params.push('order=' + order)
  }
  if (total && Number(total) > 0) {
    params.push('total=' + total)
  }
  if (darkness && Number(darkness) > 0) {
    params.push('darkness=' + darkness)
  }
  if (view && Number(view) > 0) {
    params.push('view=' + view)
  }
  if (safety && Number(safety) > 0) {
    params.push('safety=' + safety)
  }

  if (params.length === 0) {
    return '/spot/list'
  } else {
    return '/spot/list?' + params.join('&')
  }
}
