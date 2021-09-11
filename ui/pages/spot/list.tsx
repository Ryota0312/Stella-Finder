import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { GridList, GridListItemData } from '../../components/common/GridList'

type SpotListItem = {
  id: number
  name: string
}

const List: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/spot/list', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>Spot List</title>
      </Head>

      <main>
        <h2>Spot List</h2>
        <Link href={'/spot/register'}>スポット登録</Link>
        <GridList data={convertToGridItem(data)} link="spot/detail" />
      </main>
    </Layout>
  )
}
export default List

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return { id: spot.id, title: spot.name } as GridListItemData
  })
}