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
      {!fileKey && <div>No image</div>}
    </ImageWrapper>
  )
}

/*
const ImageWrapper = styled.div.attrs(
  (props: { width: string; height: string }) => ({
    width: props.width,
    height: props.height,
  }),
)`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`
*/

const ImageWrapper = styled.div<Partial<ImageSize>>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

ImageWrapper.defaultProps = {
  width: '100%',
  height: '200px',
}
