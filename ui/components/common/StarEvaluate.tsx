import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type StarEvaluateProps = {
  label?: string
  point: number
  showPoint?: boolean
}

export const StarEvaluate: React.FC<StarEvaluateProps> = (
  props: StarEvaluateProps,
) => {
  return (
    <div>
      {!!props.label && <p>{props.label}</p>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div>
          {!!props.showPoint &&
            (Math.round(props.point * 10) / 10).toPrecision(2)}
        </div>
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
    </div>
  )
}

const StarEvaluateWrapper = styled.div`
  display: flex;
`
