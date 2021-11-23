import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type StarEvaluateProps = {
  onChange?: (point: number) => void
}

export const StarEvaluate: React.FC<StarEvaluateProps> = (
  props: StarEvaluateProps,
) => {
  const [point, setPoint] = useState(0)

  useEffect(() => {
    if (props.onChange) props.onChange(point)
  }, [point])

  return (
    <StarEvaluator>
      <StarButton onClick={() => setPoint(1)}>
        {point >= 1 && (
          <Image src="/image/star.png" width={32} height={32} alt="star" />
        )}
        {point < 1 && (
          <Image
            src="/image/star-blank.png"
            width={32}
            height={32}
            alt="star"
          />
        )}
      </StarButton>

      <StarButton onClick={() => setPoint(2)}>
        {point >= 2 && (
          <Image src="/image/star.png" width={32} height={32} alt="star" />
        )}
        {point < 2 && (
          <Image
            src="/image/star-blank.png"
            width={32}
            height={32}
            alt="star"
          />
        )}
      </StarButton>

      <StarButton onClick={() => setPoint(3)}>
        {point >= 3 && (
          <Image src="/image/star.png" width={32} height={32} alt="star" />
        )}
        {point < 3 && (
          <Image
            src="/image/star-blank.png"
            width={32}
            height={32}
            alt="star"
          />
        )}
      </StarButton>

      <StarButton onClick={() => setPoint(4)}>
        {point >= 4 && (
          <Image src="/image/star.png" width={32} height={32} alt="star" />
        )}
        {point < 4 && (
          <Image
            src="/image/star-blank.png"
            width={32}
            height={32}
            alt="star"
          />
        )}
      </StarButton>

      <StarButton onClick={() => setPoint(5)}>
        {point >= 5 && (
          <Image src="/image/star.png" width={32} height={32} alt="star" />
        )}
        {point < 5 && (
          <Image
            src="/image/star-blank.png"
            width={32}
            height={32}
            alt="star"
          />
        )}
      </StarButton>
    </StarEvaluator>
  )
}

const StarEvaluator = styled.div`
  display: flex;
`

const StarButton = styled.button`
  border: none;
  background: none;

  &:hover,
  &:focus {
    background: none;
  }
`
