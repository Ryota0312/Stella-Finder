import React from 'react'
import styled from 'styled-components'
import { StarEvaluate } from '../common/StarEvaluate'
import { ImageList, ImageListItem } from '../common/ImageList'
import { RoundFrame } from '../common/RoundFrame'
import { LinkedUserName } from '../common/LinkedUserName'

type ReviewProps = {
  darkness: number
  view: number
  safety: number
  comment: string
  createdBy: number
  createdAt: string
  images: Array<string> | null
}

export const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
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
    </RoundFrame>
  )
}

const Evaluates = styled.div`
  display: flex;
  gap: 0 16px;
  margin-bottom: 16px;
`

const Comment = styled.div`
  margin-top: 32px;
  white-space: pre-line;
`

const CreatedAt = styled.div`
  text-align: right;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${
    dt.getMonth() + 1
  }月${dt.getDate()}日 ${dt.getHours()}:${dt.getMinutes()}`
}
