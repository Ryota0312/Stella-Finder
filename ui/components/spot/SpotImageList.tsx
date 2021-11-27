import React from 'react'
import useSWR from 'swr'
import { ImageList, ImageListItem } from '../common/ImageList'
import { useApi } from '../../hooks/useApi'

type SpotImageList = {
  spotId: number
}

export const SpotImageList: React.FC<SpotImageList> = (
  props: SpotImageList,
) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    props.spotId
      ? ['/api/spot/image/list?spotId=' + props.spotId, false]
      : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <ImageList data={convertToFileItems_(data)} />
}

const convertToFileItems_ = (data: any[]): ImageListItem[] => {
  if (data === undefined) return []

  return data.map((d) => {
    return { fileKey: d.image, fileName: '' } as ImageListItem
  })
}
