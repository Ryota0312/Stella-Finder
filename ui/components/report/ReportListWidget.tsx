import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'
import { ReportListItem } from './ReportListItem'

type ReportListWidgetProps = {
  spotId: number
  limit: number
}

export const ReportListWidget: React.FC<ReportListWidgetProps> = (
  props: ReportListWidgetProps,
) => {
  const { fetcher } = useApi()
  const { data, error } = useSWR(
    [
      '/api/report/listBySpot' +
        '?spotId=' +
        props.spotId +
        '&limit=' +
        props.limit,
      false,
    ],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame title="観測レポート">
      <ReportList>
        {data.length > 0 ? (
          <>
            {data.map((d: any) => (
              <li key={d.id}>
                <ReportListItem
                  id={d.id}
                  title={d.title}
                  coverImage={d.coverImage}
                  body={d.body}
                  createdAt={d.createdAt}
                  createdBy={d.createdBy}
                />
              </li>
            ))}
          </>
        ) : (
          <div>レポートがありません</div>
        )}
      </ReportList>
    </RoundFrame>
  )
}

const ReportList = styled.ul`
  list-style: none;
  padding: 8px;
`
