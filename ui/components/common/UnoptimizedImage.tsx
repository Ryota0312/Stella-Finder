import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Property } from 'csstype'

interface ImageSize {
  width: string
  height: string
  maxWidth?: string
  maxHeight?: string
  borderRadius?: string
}

interface UnoptimizedImageInterface extends ImageSize {
  fileKey: string
  objectFit?: Property.ObjectFit
  fetchedImageSize?: number
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
      borderRadius={props.borderRadius}
    >
      {!!props.fileKey && props.fetchedImageSize !== undefined && (
        <Image
          src={
            '/api/file/download?fileKey=' +
            props.fileKey +
            (props.fetchedImageSize && props.fetchedImageSize > 0
              ? `&size=${props.fetchedImageSize}`
              : '')
          }
          alt=""
          unoptimized={true}
          layout="fill"
          objectFit={props.objectFit}
          onError={(e) => {
            e.currentTarget.src = `/image/image-icon.png`
          }}
        />
      )}
      {!props.fileKey && (
        <NoImage
          width={props.width}
          height={props.height}
          maxWidth={props.maxWidth}
          maxHeight={props.maxHeight}
        >
          No image
        </NoImage>
      )}
    </ImageWrapper>
  )
}

UnoptimizedImage.defaultProps = {
  objectFit: 'contain',
  fetchedImageSize: 0,
}

const ImageWrapper = styled.div<Partial<ImageSize>>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};

  img {
    border-radius: ${({ borderRadius }) => borderRadius};
  }
`

const NoImage = styled.div<Partial<ImageSize>>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
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
