import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { StarEvaluate } from '../common/StarEvaluate'
import { ImageList, ImageListItem } from '../common/ImageList'
import { RoundFrame } from '../common/RoundFrame'
import { LinkedUserName } from '../common/LinkedUserName'
import { useApi } from '../../hooks/useApi'

type ReviewProps = {
  id: number
  darkness: number
  view: number
  safety: number
  comment: string
  createdBy: number
  createdAt: string
  images: Array<string> | null
}

export const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { postFetcher } = useApi()

  return (
    <RoundFrame>
      <LinkedUserName userId={props.createdBy} showIcon={true} />
      <Evaluates>
        <StarEvaluate label="空の暗さ" point={props.darkness} />
        <StarEvaluate label="見晴らし" point={props.view} />
        <StarEvaluate label="安全性" point={props.safety} />
      </Evaluates>
      <Comment>{props.comment}</Comment>
      {props.images && (
        <ImageList
          imageList={props.images.map((image) => {
            return {
              fileKey: image,
              fileName: '',
              createdBy: 0, // FIXME
            } as ImageListItem
          })}
        />
      )}
      <CreatedAt>{convertDateTimeString_(props.createdAt)}</CreatedAt>
      <button
        onClick={() => postFetcher('/api/review/like', { reviewId: props.id })}
      >
        <ButtonInnerWithImage>
          <Image
            src={'/image/like-review.png'}
            alt={'Like review'}
            width={18}
            height={18}
          />
          <div>参考になった</div>
        </ButtonInnerWithImage>
      </button>
    </RoundFrame>
  )
}

const Evaluates = styled.div`
  display: flex;
  gap: 0 16px;
  margin-bottom: 16px;
`

const Comment = styled.div`
  margin: 32px 0;
  white-space: pre-line;
`

const CreatedAt = styled.div`
  text-align: right;
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 4px;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${
    dt.getMonth() + 1
  }月${dt.getDate()}日 ${dt.getHours()}:${dt.getMinutes()}`
}
