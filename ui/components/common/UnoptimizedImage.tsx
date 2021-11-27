import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Property } from 'csstype'

interface ImageSize {
  width: string
  height: string
  maxWidth?: string
  maxHeight?: string
}

interface UnoptimizedImageInterface extends ImageSize {
  fileKey: string
  objectFit?: Property.ObjectFit
}

export const UnoptimizedImage: React.FC<Partial<UnoptimizedImageInterface>> = (
  props: Partial<UnoptimizedImageInterface>,
) => {
  return (
    <ImageWrapper
      width={props.width}
      height={props.height}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      {!!props.fileKey && (
        <Image
          src={'/api/file/download?fileKey=' + props.fileKey}
          alt=""
          unoptimized={true}
          layout="fill"
          objectFit={!props.objectFit ? 'contain' : props.objectFit}
        />
      )}
      {!props.fileKey && <NoImage height={props.height}>No image</NoImage>}
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div<Partial<ImageSize>>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
`

const NoImage = styled.div<Partial<ImageSize>>`
  text-align: center;
  line-height: ${({ height }) => height};
  border: 1px solid grey;
  background-color: #ececec;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    color-stop(0.25, #f9f9f9),
    color-stop(0.25, transparent),
    color-stop(0.5, transparent),
    color-stop(0.5, #f9f9f9),
    color-stop(0.75, #f9f9f9),
    color-stop(0.75, transparent),
    to(transparent)
  );
  -webkit-background-size: 16px 16px;
`

ImageWrapper.defaultProps = {
  width: '100%',
  height: '200px',
  maxWidth: '100%',
  maxHeight: '100%',
}
