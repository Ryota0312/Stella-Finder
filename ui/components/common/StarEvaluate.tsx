import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type StarEvaluateProps = {
  label: string
  point: number
}

export const StarEvaluate: React.FC<StarEvaluateProps> = (
  props: StarEvaluateProps,
) => {
  return (
    <div>
      <p>{props.label}</p>
      <StarEvaluateWrapper>
        {props.point >= 1 && (
          <Image src="/image/star.png" width={24} height={24} alt="star" />
        )}
        {props.point < 1 && (
          <Image
            src="/image/star-blank.png"
            width={24}
            height={24}
            alt="star"
          />
        )}

        {props.point >= 2 && (
          <Image src="/image/star.png" width={24} height={24} alt="star" />
        )}
        {props.point < 2 && (
          <Image
            src="/image/star-blank.png"
            width={24}
            height={24}
            alt="star"
          />
        )}

        {props.point >= 3 && (
          <Image src="/image/star.png" width={24} height={24} alt="star" />
        )}
        {props.point < 3 && (
          <Image
            src="/image/star-blank.png"
            width={24}
            height={24}
            alt="star"
          />
        )}

        {props.point >= 4 && (
          <Image src="/image/star.png" width={24} height={24} alt="star" />
        )}
        {props.point < 4 && (
          <Image
            src="/image/star-blank.png"
            width={24}
            height={24}
            alt="star"
          />
        )}

        {props.point >= 5 && (
          <Image src="/image/star.png" width={24} height={24} alt="star" />
        )}
        {props.point < 5 && (
          <Image
            src="/image/star-blank.png"
            width={24}
            height={24}
            alt="star"
          />
        )}
      </StarEvaluateWrapper>
    </div>
  )
}

const StarEvaluateWrapper = styled.div`
  display: flex;
`
