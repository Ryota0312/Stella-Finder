import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { StarEvaluate } from '../common/StarEvaluate'

type ReviewSummaryProps = {
  spotId: number
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = (
  props: ReviewSummaryProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    props.spotId ? ['/api/review/summary?spotId=' + props.spotId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ReviewSummaryContent>
      <StarEvaluate label={'総合'} point={data.total} showPoint={true} />
      <StarEvaluate label={'空の暗さ'} point={data.darkness} showPoint={true} />
      <StarEvaluate label={'見晴らし'} point={data.view} showPoint={true} />
      <StarEvaluate label={'安全性'} point={data.safety} showPoint={true} />
    </ReviewSummaryContent>
  )
}

const ReviewSummaryContent = styled.div`
  border: 1px solid #ccc;
  padding: 16px 48px;
  width: 100%;

  @media screen and (max-width: 950px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    width: auto;
    margin: 16px 0;
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
