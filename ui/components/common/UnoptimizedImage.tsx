import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

export const UnoptimizedImage: React.FC<{ src: string; height: string }> = ({
  src,
  height,
}) => {
  return (
    <ImageWrapper height={height}>
      <Image
        src={src}
        alt=""
        unoptimized={true}
        layout="fill"
        objectFit="contain"
      />
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
