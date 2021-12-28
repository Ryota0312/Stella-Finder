import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import Show from '../../pages/article/[articleId]/show'
import { RoundFrame } from '../common/RoundFrame'

export const ArticleListWidget: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/list?limit=5', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <RoundFrame title="News">
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
        <ShowAll>
          <Link href="/article/list">すべての News を見る</Link>
        </ShowAll>
      </ArticleListUl>
    </RoundFrame>
  )
}

const ShowAll = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 8px 4px 0;
  font-size: 10px;
`

const ArticleListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
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
