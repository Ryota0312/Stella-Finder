import React from 'react'
import useSWR from 'swr'
import { ImageList, ImageListItem } from '../common/ImageList'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'

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
  if (!data) return <TinyLoading />

  return <ImageList imageList={convertToFileItems_(data)} />
}

const convertToFileItems_ = (data: any[]): ImageListItem[] => {
  if (data === undefined) return []

  return data.map((d) => {
    return {
      fileKey: d.image,
      fileName: '',
      createdBy: d.createdBy,
    } as ImageListItem
  })
}
