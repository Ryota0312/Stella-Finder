import React from 'react'
import styled from 'styled-components'
import { UnoptimizedImage } from './UnoptimizedImage'

export interface ImageListItem {
  fileKey: string
  fileName: string
}

export const ImageList: React.FC<{ data: ImageListItem[] }> = ({ data }) => {
  return (
    <ImageGridLayout>
      {data.map((d: ImageListItem) => {
        return (
          <ImageItem key={d.fileKey}>
            <UnoptimizedImage
              fileKey={d.fileKey}
              width="25vw"
              height="25vw"
              maxWidth="200px"
              maxHeight="200px"
              objectFit="cover"
            />
          </ImageItem>
        )
      })}
    </ImageGridLayout>
  )
}

const ImageGridLayout = styled.ul`
  display: grid;
  padding: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`

const ImageItem = styled.li`
  list-style-type: none;
  padding: 8px;
`
