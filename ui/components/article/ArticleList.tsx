import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'

export const ArticleList: React.FC = () => {
  const fetcher = useApi()
  const { data, error } = useSWR(['/api/article/list', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ul>
      {data.map((d: any) => (
        <li key={d.id}>
          <Link href={'/article/' + d.id + '/show'}>{d.title}</Link>
        </li>
      ))}
    </ul>
  )
}
