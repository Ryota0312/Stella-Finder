import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type StarEvaluatorProps = {
  label: string
  value?: number
  required?: boolean
  onChange?: (point: number) => void
  size: number
}

export const StarEvaluator: React.FC<StarEvaluatorProps> = (
  props: StarEvaluatorProps,
) => {
  const [point, setPoint] = useState(props.value ? props.value : 0)

  useEffect(() => {
    if (props.onChange) props.onChange(point)
  }, [point])

  useEffect(() => setPoint(props.value ? props.value : 0), [props.value])

  return (
    <div>
      <Label>
        {!!props.label && <p>{props.label}</p>}
        {props.required && <Required>必須</Required>}
      </Label>
      <StarEvaluatorButtons>
        <StarButton onClick={() => setPoint(1)}>
          {point >= 1 && (
            <Image
              src="/image/star.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
          {point < 1 && (
            <Image
              src="/image/star-blank.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
        </StarButton>

        <StarButton onClick={() => setPoint(2)}>
          {point >= 2 && (
            <Image
              src="/image/star.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
          {point < 2 && (
            <Image
              src="/image/star-blank.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
        </StarButton>

        <StarButton onClick={() => setPoint(3)}>
          {point >= 3 && (
            <Image
              src="/image/star.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
          {point < 3 && (
            <Image
              src="/image/star-blank.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
        </StarButton>

        <StarButton onClick={() => setPoint(4)}>
          {point >= 4 && (
            <Image
              src="/image/star.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
          {point < 4 && (
            <Image
              src="/image/star-blank.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
        </StarButton>

        <StarButton onClick={() => setPoint(5)}>
          {point >= 5 && (
            <Image
              src="/image/star.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
          {point < 5 && (
            <Image
              src="/image/star-blank.png"
              width={props.size}
              height={props.size}
              alt="star"
            />
          )}
        </StarButton>
      </StarEvaluatorButtons>
    </div>
  )
}

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Required = styled.div`
  background-color: #de2121;
  font-size: 8px;
  color: white;
  border-radius: 4px;
  padding: 2px 4px;
`

const StarEvaluatorButtons = styled.div`
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
