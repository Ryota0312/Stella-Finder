import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { Review } from './Review'

export const ReviewList: React.FC<{ spotId: number }> = ({ spotId }) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    spotId ? ['/api/review/list?spotId=' + spotId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ReviewListUl>
      {data.map((d: any) => {
        return (
          <Review
            key={d.id}
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
