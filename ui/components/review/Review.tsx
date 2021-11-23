import React from 'react'
import styled from 'styled-components'
import { StarEvaluate } from '../common/StarEvaluate'
import { ImageList, ImageListItem } from '../common/ImageList'

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
    <ReviewListItem>
      <Evaluates>
        <StarEvaluate label="空の暗さ" point={props.darkness} />
        <StarEvaluate label="見晴らし" point={props.view} />
        <StarEvaluate label="安全性" point={props.safety} />
      </Evaluates>
      {props.comment}
      {props.images && (
        <ImageList
          data={props.images.map((image) => {
            return { fileKey: image, fileName: '' } as ImageListItem
          })}
        />
      )}
    </ReviewListItem>
  )
}

const ReviewListItem = styled.li`
  list-style: none;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 16px;
`

const Evaluates = styled.div`
  display: flex;
  gap: 0 16px;
  margin-bottom: 16px;
`
