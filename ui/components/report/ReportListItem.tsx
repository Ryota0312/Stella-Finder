import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { UnoptimizedImage } from '../common/UnoptimizedImage'
import { LinkedUserName } from '../common/LinkedUserName'

type ReportListItemProps = {
  id: number
  title: string
  coverImage: string
  body: string
  createdAt: string
  createdBy: number
}

export const ReportListItem: React.FC<ReportListItemProps> = (
  props: ReportListItemProps,
) => {
  const router = useRouter()
  return (
    <CardWrapper>
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
          <ReportSummary>
            {props.body.substr(0, 100)}
            {props.body.length > 100 ? '...' : ''}
          </ReportSummary>
        </div>
      </Card>
      <CreatedInfo>
        <div>by</div>
        <LinkedUserName userId={props.createdBy} showIcon={false} />
      </CreatedInfo>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  position: relative;
`

const Card = styled.button`
  display: flex;
  flex: 1;
  gap: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin: 8px 0;
  width: 100%;
  text-align: left;
  overflow: hidden;

  :hover,
  :focus {
    background-color: transparent;
    border: solid 2px #ffa216;
  }
`

const CreatedInfo = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  bottom: 4px;
  right: 8px;
  font-size: 8px;
`

const ReportSummary = styled.div`
  margin: 8px 8px 12px 0;
`
