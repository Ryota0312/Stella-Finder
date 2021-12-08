import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export const ArticleList: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/list?limit=5', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ArticleListUl>
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

const ArticleListUl = styled.ul`
  list-style: none;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
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
