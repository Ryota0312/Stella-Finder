import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { RoundFrame } from '../common/RoundFrame'

type TagListProps = {
  tagId?: number
}

export const TagList: React.FC<TagListProps> = (props) => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/tag/list', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <div>
      {data.map((d: any) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  )
}

const ArticleListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
