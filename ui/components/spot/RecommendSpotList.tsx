import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { GridList, GridListItemData } from '../common/GridList'

type RecommendSpotListProps = {
  prefecture?: string
}

export const RecommendSpotList: React.FC<RecommendSpotListProps> = (props) => {
  const [prefecture, setPrefecture] = useState('')

  useEffect(() => {
    const localStoragePref = localStorage.getItem('prefecture')
    if (localStoragePref) {
      setPrefecture(localStoragePref)
    }
  }, [])

  const { fetcher } = useApi()
  const { data, error } = useSWR(
    prefecture
      ? [
          '/api/spot/list?order=avg_total_point+desc&limit=3&pref=' +
            prefecture,
          false,
        ]
      : null,
    fetcher,
  )

  if (error) return <div>error</div>
  if (!data) return <TinyLoading />

  return (
    <div>
      <p>{prefecture}のおすすめスポット</p>
      {data.length === 0 && <div>スポットが登録されていません</div>}
      {data.length > 0 && (
        <GridList data={convertToGridItem(data)} link="spot/detail" />
      )}
    </div>
  )
}
export default RecommendSpotList

type SpotListItem = {
  id: number
  name: string
  coverImage: string
  avgTotalPoint: number
  reviewCount: number
}

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
