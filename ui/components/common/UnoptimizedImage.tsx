import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

interface ImageSize {
  width: string
  height: string
}

interface UnoptimizedImageInterface extends ImageSize {
  fileKey: string
}

export const UnoptimizedImage: React.FC<Partial<UnoptimizedImageInterface>> = ({
  fileKey,
  width,
  height,
}) => {
  return (
    <ImageWrapper width={width} height={height}>
      {!!fileKey && (
        <Image
          src={'/api/file/download?fileKey=' + fileKey}
          alt=""
          unoptimized={true}
          layout="fill"
          objectFit="contain"
        />
      )}
      {!fileKey && <NoImage height={height}>No image</NoImage>}
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div<Partial<ImageSize>>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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
}
