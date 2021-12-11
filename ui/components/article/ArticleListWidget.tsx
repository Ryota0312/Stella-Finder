import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'

export const ArticleListWidget: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/list?limit=5', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <ArticleListUl>
      <ArticleListLabel>お知らせ</ArticleListLabel>
      {data.map((d: any) => (
        <li key={d.id}>
          <Link href={'/article/' + d.id + '/show'}>
            <ArticleListItem>
              <div>{d.title}</div>
              <div>{convertDateTimeString_(d.createdAt)}</div>
            </ArticleListItem>
          </Link>
        </li>
      ))}
    </ArticleListUl>
  )
}

const ArticleListLabel = styled.div`
  position: absolute;
  top: -16px;
  left: 16px;
  font-size: 24px;
  background-color: white;
  color: #9f9f9f;
`

const ArticleListUl = styled.ul`
  position: relative;
  list-style: none;
  border: 1px solid #ccc;
  padding: 24px 16px 16px 16px;
  border-radius: 8px;
  margin: 0;
`

const ArticleListItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: #0070f3;
  cursor: pointer;
  padding: 4px;

  &:hover,
  &:focus {
    background-color: #aaa;
  }
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${
    dt.getMonth() + 1
  }月${dt.getDate()}日 ${dt.getHours()}:${dt.getMinutes()}`
}
