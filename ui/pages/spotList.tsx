import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import Layout from '../components/layout'
import { useApi } from '../hooks/useApi'
import { GridList, GridListItemData } from '../components/common/GridList'
import { ImageUploader } from '../components/common/ImageUploader'

type SpotListItem = {
  id: number
  name: string
}

const SpotList: React.FC = () => {
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
        <ImageUploader />
        <GridList data={convertToGridItem(data)} link="spot" />
      </main>
    </Layout>
  )
}
export default SpotList

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return { id: spot.id, title: spot.name } as GridListItemData
  })
}
