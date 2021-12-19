import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { Review } from './Review'

export const ReviewList: React.FC<{ spotId: number }> = ({ spotId }) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    spotId ? ['/api/review/list?spotId=' + spotId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <ReviewListUl>
      {data.length === 0 && <div>レビューがありません</div>}
      {data.length > 0 &&
        data.map((d: any) => {
          return (
            <Review
              key={d.id}
              id={d.id}
              darkness={d.darkness}
              view={d.view}
              safety={d.safety}
              comment={d.comment}
              createdBy={d.createdBy}
              createdAt={d.createdAt}
              images={d.images}
            />
          )
        })}
    </ReviewListUl>
  )
}

const ReviewListUl = styled.ul`
  padding: 8px;
`
