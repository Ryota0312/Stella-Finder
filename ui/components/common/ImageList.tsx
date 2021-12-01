import React, { useState } from 'react'
import styled from 'styled-components'
import { UnoptimizedImage } from './UnoptimizedImage'
import { ZoomImage } from './ZoomImage'

export interface ImageListItem {
  fileKey: string
  fileName: string
}

export const ImageList: React.FC<{ data: ImageListItem[] }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomFileKey, setZoomFileKey] = useState('')

  return (
    <ImageGridLayout>
      {data.map((d: ImageListItem) => {
        return (
          <>
            <ImageItem key={d.fileKey}>
              <ImageItemButton
                onClick={() => {
                  setZoomFileKey(d.fileKey)
                  setIsOpen(true)
                }}
              >
                <UnoptimizedImage
                  fileKey={d.fileKey}
                  width="25vw"
                  height="25vw"
                  maxWidth="200px"
                  maxHeight="200px"
                  objectFit="cover"
                />
              </ImageItemButton>
            </ImageItem>
            <ZoomImage
              fileKey={zoomFileKey}
              isOpen={isOpen}
              closeDialog={() => setIsOpen(false)}
            />
          </>
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

const ImageItemButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
`
