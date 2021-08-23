import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

export const UnoptimizedImage: React.FC<{ fileKey: string; height: string }> =
  ({ fileKey, height }) => {
    return (
      <ImageWrapper height={height}>
        {!!fileKey && (
          <Image
            src={'/api/file/download?fileKey=' + fileKey}
            alt=""
            unoptimized={true}
            layout="fill"
            objectFit="contain"
          />
        )}
        {!fileKey && <div>No image</div>}
      </ImageWrapper>
    )
  }

const ImageWrapper = styled.div.attrs((props: { height: string }) => ({
  height: props.height,
}))`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
`
