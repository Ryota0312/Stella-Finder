import React from 'react'
import styled from 'styled-components'
import { StarEvaluate } from '../common/StarEvaluate'

type ReviewSummaryProps = {
  total: number
  darkness: number
  view: number
  safety: number
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = (
  props: ReviewSummaryProps,
) => {
  return (
    <ReviewSummaryContent>
      <StarEvaluate label={'総合'} point={props.total} showPoint={true} />
      <StarEvaluate
        label={'空の暗さ'}
        point={props.darkness}
        showPoint={true}
      />
      <StarEvaluate label={'見晴らし'} point={props.view} showPoint={true} />
      <StarEvaluate label={'安全性'} point={props.safety} showPoint={true} />
    </ReviewSummaryContent>
  )
}

const ReviewSummaryContent = styled.div`
  border: 1px solid #ccc;
  padding: 16px 48px;

  @media screen and (max-width: 950px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    width: auto;
    margin: 8px 0;
  }

  @media screen and (max-width: 450px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    width: auto;
    margin: 16px 0;
  }
`
