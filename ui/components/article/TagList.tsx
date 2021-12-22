import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'

type TagListProps = {
  selected: number
  onChange: (tagId: number) => void
}

export const TagList: React.FC<TagListProps> = (props) => {
  const [name, setName] = useState('')

  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/tag/list', false], fetcher)

  useEffect(() => {
    if (data) {
      const tag = data.filter((d: any) => d.id === props.selected)
      if (tag.length > 0) {
        setName('#' + tag[0].name)
      } else {
        setName('すべての記事')
      }
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <>
      <DisplayedArticle>{name}を表示中</DisplayedArticle>
      <TagListUl>
        <li>
          <TagListItem
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              props.onChange(0)
              setName('すべての記事')
              e.currentTarget.blur()
            }}
            selected={!props.selected}
          >
            すべて表示
          </TagListItem>
        </li>
        {data.map((d: any) => (
          <li key={d.id}>
            <TagListItem
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                props.onChange(d.id)
                setName('#' + d.name + 'の記事')
                e.currentTarget.blur()
              }}
              selected={props.selected === d.id}
            >
              #{d.name}
            </TagListItem>
          </li>
        ))}
      </TagListUl>
    </>
  )
}

const TagListUl = styled.ul`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style: none;
  padding: 8px;
  margin: 0;
`

const TagListItem = styled.button<{ selected: boolean }>`
  height: 32px;
  background-color: ${({ selected }) => (selected ? '#b2b2ff' : 'transparent')};
`

const DisplayedArticle = styled.div`
  margin-bottom: 8px;
`
