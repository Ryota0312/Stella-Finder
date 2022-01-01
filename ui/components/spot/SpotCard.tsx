import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { UnoptimizedImage } from '../common/UnoptimizedImage'

type SpotCardProps = {
  spotId: number
  onClick: () => void
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
        <Card onClick={() => props.onClick()}>
          <UnoptimizedImage
            fileKey={data.coverImage}
            width="10vw"
            height="10vw"
            maxWidth="100px"
            maxHeight="100px"
            minWidth="70px"
            minHeight="70px"
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

const Card = styled.button`
  display: flex;
  flex: 1;
  gap: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin: 8px 0;
  max-width: 600px;
  width: 70vw;
  text-align: left;

  :hover,
  :focus {
    background-color: transparent;
    border: solid 2px #ffa216;
  }
`
