import React from 'react'
import useSWR from 'swr'
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
    ['/api/review/summary?spotId=' + props.spotId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <StarEvaluate label={'空の暗さ'} point={data.darkness} showPoint={true} />
      <StarEvaluate label={'見晴らし'} point={data.view} showPoint={true} />
      <StarEvaluate label={'安全性'} point={data.safety} showPoint={true} />
    </div>
  )
}
