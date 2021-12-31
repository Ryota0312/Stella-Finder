import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { UnoptimizedImage } from '../common/UnoptimizedImage'

type SpotCardProps = {
  spotId: number
}

export const SpotCard: React.FC<SpotCardProps> = (props: SpotCardProps) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    !props.spotId ? null : ['/api/spots?id=' + props.spotId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data && !!props.spotId) return <TinyLoading />

  return (
    <>
      {!!props.spotId && (
        <Card>
          <UnoptimizedImage
            fileKey={data.coverImage}
            width="100px"
            height="100px"
            minWidth="100px"
            minHeight="100px"
            objectFit="cover"
            fetchedImageSize={300}
          />
          <div>
            <b>{data.name}</b>
            <div>{data.prefecture + data.address}</div>
          </div>
        </Card>
      )}
    </>
  )
}

const Card = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin: 8px 0;
  width: fit-content;
`
