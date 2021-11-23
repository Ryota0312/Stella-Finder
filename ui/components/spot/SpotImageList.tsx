import React from 'react'
import useSWR from 'swr'
import { ImageList, ImageListItem } from '../common/ImageList'
import { useApi } from '../../hooks/useApi'

export const SpotImageList: React.FC<{ spotId: number }> = ({ spotId }) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/spot/image/list' + '?spotId=' + spotId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <ImageList data={convertToFileItems_(data)} />
}

const convertToFileItems_ = (data: any[]): ImageListItem[] => {
  if (data === undefined) return []
  console.log(data)

  return data.map((d) => {
    return { fileKey: d.image, fileName: '' } as ImageListItem
  })
}
