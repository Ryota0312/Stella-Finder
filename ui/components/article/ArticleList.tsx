import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'

type ArticleListProps = {
  tagId?: number
}

export const ArticleList: React.FC<ArticleListProps> = (props) => {
  const fetcher = useApi()
  const { data, error } = useSWR(
    props.tagId && props.tagId !== 0
      ? ['/api/article/listByTag?id=' + props.tagId, false]
      : ['/api/article/list', false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame>
      <ArticleListUl>
        {data.map((d: any) => (
          <li key={d.id}>
            <Link href={'/article/' + d.id + '/show'}>
              <ArticleListItem>
                <div>{d.title}</div>
                <PostDateTime>
                  {convertDateTimeString_(d.createdAt)}
                </PostDateTime>
              </ArticleListItem>
            </Link>
          </li>
        ))}
      </ArticleListUl>
    </RoundFrame>
  )
}

const ArticleListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ArticleListItem = styled.div`
  width: 100%;
  color: #0070f3;
  cursor: pointer;
  padding: 4px;

  &:hover,
  &:focus {
    background-color: #aaa;
  }
`

const PostDateTime = styled.div`
  text-align: right;
  font-size: 8px;
  color: gray;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日 ${(
    '00' + dt.getHours()
  ).slice(-2)}:${('00' + dt.getMinutes()).slice(-2)}`
}
