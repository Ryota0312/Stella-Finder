import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { UnoptimizedImage } from '../common/UnoptimizedImage'

type ReportListItemProps = {
  id: number
  title: string
  coverImage: string
}

export const ReportListItem: React.FC<ReportListItemProps> = (
  props: ReportListItemProps,
) => {
  const router = useRouter()
  return (
    <Card onClick={() => router.push('/report/' + props.id + '/show')}>
      <UnoptimizedImage
        fileKey={props.coverImage}
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
        <b>{props.title}</b>
        {/*<div>{data.prefecture + data.address}</div>*/}
      </div>
    </Card>
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
