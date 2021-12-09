import React from 'react'
import useSWR from 'swr'
import { ImageList, ImageListItem } from '../common/ImageList'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'

type UserImageListProps = {
  userId: number
}

export const UserImageList: React.FC<UserImageListProps> = (
  props: UserImageListProps,
) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    props.userId ? ['/api/file/list?userId=' + props.userId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return <ImageList imageList={convertToFileItems_(data)} />
}

const convertToFileItems_ = (data: any[]): ImageListItem[] => {
  return data.map((d) => {
    return {
      fileKey: d.fileKey,
      fileName: d.fileName,
      createdBy: d.createdBy,
    } as ImageListItem
  })
}
