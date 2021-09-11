import React from 'react'
import useSWR from 'swr'
import { ImageList, ImageListItem } from '../common/ImageList'
import { useApi } from '../../hooks/useApi'

export const UserImageList: React.FC<{ userId: number }> = ({ userId }) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/file/list' + '?userId=' + userId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <ImageList data={convertToFileItems_(data)} />
}

const convertToFileItems_ = (data: any[]): ImageListItem[] => {
  return data.map((d) => {
    return { fileKey: d.fileKey, fileName: d.fileName } as ImageListItem
  })
}
