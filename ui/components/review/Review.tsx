import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { bool } from 'prop-types'
import { StarEvaluate } from '../common/StarEvaluate'
import { ImageList, ImageListItem } from '../common/ImageList'
import { RoundFrame } from '../common/RoundFrame'
import { LinkedUserName } from '../common/LinkedUserName'
import { useApi } from '../../hooks/useApi'
import { AutoLink } from '../common/AutoLink'

type ReviewProps = {
  id: number
  darkness: number
  view: number
  safety: number
  comment: string
  createdBy: number
  createdAt: string
  images: Array<string> | null
  likeCount: number
}

export const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
  const { postFetcher } = useApi()
  const [likeCount, setLikeCount] = useState(props.likeCount)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(isAlreadyLiked_(props.id))
  }, [props.id])

  return (
    <RoundFrame>
      <LinkedUserName userId={props.createdBy} showIcon={true} />
      <Evaluates>
        <StarEvaluate label="空の暗さ" point={props.darkness} />
        <StarEvaluate label="見晴らし" point={props.view} />
        <StarEvaluate label="安全性" point={props.safety} />
      </Evaluates>
      <Comment>
        <AutoLink>{props.comment}</AutoLink>
      </Comment>
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
      <LikeButton
        disabled={isLiked}
        isLiked={isLiked}
        title={isLiked ? 'クリック済みです' : ''}
        onClick={() =>
          postFetcher('/api/review/like', { reviewId: props.id }).then(() => {
            setLikeCount(likeCount + 1)
            setIsLiked(true)
            storeLikedReview_(props.id)
          })
        }
      >
        <ButtonInnerWithImage>
          <Image
            src={'/image/like-review.png'}
            alt={'Like review'}
            width={18}
            height={18}
          />
          <div>参考になった {likeCount}</div>
        </ButtonInnerWithImage>
      </LikeButton>
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

const LikeButton = styled.button<{ isLiked: boolean }>`
  cursor: ${({ isLiked }) => (isLiked ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isLiked }) => (isLiked ? 'transparent' : '#aaa')};
  }
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日 ${(
    '00' + dt.getHours()
  ).slice(-2)}:${('00' + dt.getMinutes()).slice(-2)}`
}

const isAlreadyLiked_ = (reviewId: number) => {
  const likedReviewStringValue = localStorage.getItem('likedReview')
  const likedReview: Array<number> = likedReviewStringValue
    ? likedReviewStringValue.split(',').map((id) => Number(id))
    : []

  return likedReview.includes(reviewId)
}

const storeLikedReview_ = (reviewId: number) => {
  const likedReviewStringValue = localStorage.getItem('likedReview')
  const likedReview: Array<number> = likedReviewStringValue
    ? likedReviewStringValue.split(',').map((id) => Number(id))
    : []

  if (!likedReview.includes(reviewId)) {
    localStorage.setItem('likedReview', likedReview.concat(reviewId).toString())
  }
}
