import React, { useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'
import { UnoptimizedImage } from './UnoptimizedImage'
import { ZoomImage } from './ZoomImage'

export interface ImageListItem {
  fileKey: string
  fileName: string
  createdBy: number
}

export const ImageList: React.FC<{ imageList: ImageListItem[] }> = ({
  imageList,
}) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  const [zoomFileKey, setZoomFileKey] = useState('')
  const [zoomFileCreatedBy, setZoomFileCreatedBy] = useState(0)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <ImageGridLayout>
        {imageList.map((d: ImageListItem) => {
          return (
            <ImageItem key={d.fileKey}>
              <ImageItemButton
                onClick={() => {
                  setZoomFileCreatedBy(d.createdBy)
                  setZoomFileKey(d.fileKey)
                }}
              >
                <UnoptimizedImage
                  fileKey={d.fileKey}
                  width="25vw"
                  height="25vw"
                  maxWidth="280px"
                  maxHeight="280px"
                  objectFit="cover"
                />
              </ImageItemButton>
            </ImageItem>
          )
        })}
      </ImageGridLayout>
      <ZoomImage
        fileKey={zoomFileKey}
        isOpen={!!zoomFileKey}
        closeDialog={() => setZoomFileKey('')}
        canDelete={zoomFileCreatedBy === data.id}
      />
    </>
  )
}

const ImageGridLayout = styled.ul`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`

const ImageItem = styled.li`
  list-style-type: none;
  padding: 8px;
`

const ImageItemButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
`
