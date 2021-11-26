import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type StarEvaluateProps = {
  label: string
  point: number
  showPoint?: boolean
}

export const StarEvaluate: React.FC<StarEvaluateProps> = (
  props: StarEvaluateProps,
) => {
  return (
    <div>
      <p>{props.label}</p>
      {!!props.showPoint && Math.round(props.point * 10) / 10}
      <StarEvaluateWrapper>
        {[...Array(5)].map((_, i) => {
          if (props.point < i + 0.5) {
            return (
              <Image
                key={i}
                src="/image/star-blank.png"
                width={24}
                height={24}
                alt="star"
              />
            )
          } else if (props.point >= i + 0.5 && props.point < i + 1) {
            return (
              <Image
                key={i}
                src="/image/star-half.png"
                width={24}
                height={24}
                alt="star"
              />
            )
          } else {
            return (
              <Image
                key={i}
                src="/image/star.png"
                width={24}
                height={24}
                alt="star"
              />
            )
          }
        })}
      </StarEvaluateWrapper>
    </div>
  )
}

const StarEvaluateWrapper = styled.div`
  display: flex;
`
