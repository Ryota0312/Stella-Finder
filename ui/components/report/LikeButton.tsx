import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'

type LikeButtonProps = {
  id: number
  likeCount: number
}

export const LikeButton: React.FC<LikeButtonProps> = (
  props: LikeButtonProps,
) => {
  const { postFetcher } = useApi()
  const [likeCount, setLikeCount] = useState(props.likeCount)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(isAlreadyLiked_(props.id))
  }, [props.id])

  return (
    <LikeReportButton
      disabled={isLiked}
      isLiked={isLiked}
      title={isLiked ? 'クリック済みです' : ''}
      onClick={() =>
        postFetcher('/api/report/like', { reportId: props.id }).then(() => {
          setLikeCount(likeCount + 1)
          setIsLiked(true)
          storeLikedReport_(props.id)
        })
      }
    >
      <ButtonInnerWithImage>
        <Image
          src={
            isLiked
              ? '/image/like-report-fill.png'
              : '/image/like-report-empty.png'
          }
          alt={'Like report'}
          width={20}
          height={20}
        />
        <div>いいね {likeCount}</div>
      </ButtonInnerWithImage>
    </LikeReportButton>
  )
}

const LikeReportButton = styled.button<{ isLiked: boolean }>`
  cursor: ${({ isLiked }) => (isLiked ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isLiked }) => (isLiked ? 'transparent' : '#aaa')};
  }
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 4px;
`

const isAlreadyLiked_ = (reportId: number) => {
  const likedReportStringValue = localStorage.getItem('likedReport')
  const likedReport: Array<number> = likedReportStringValue
    ? likedReportStringValue.split(',').map((id) => Number(id))
    : []

  return likedReport.includes(reportId)
}

const storeLikedReport_ = (reportId: number) => {
  const likedReportStringValue = localStorage.getItem('likedReport')
  const likedReport: Array<number> = likedReportStringValue
    ? likedReportStringValue.split(',').map((id) => Number(id))
    : []

  if (!likedReport.includes(reportId)) {
    localStorage.setItem('likedReport', likedReport.concat(reportId).toString())
  }
}
