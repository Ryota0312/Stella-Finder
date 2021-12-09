import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { Loading } from '../../../components/common/Loading'

const Show: React.FC = () => {
  const [createdBy, setCreatedBy] = useState('')
  const router = useRouter()
  const { articleId } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    articleId ? ['/api/articles?articleId=' + articleId, false] : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      getUserNameById_(data.createdBy).then((name) => setCreatedBy(name))
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>

      <main>
        <h2>{data.title}</h2>
        <PostDateTime>{convertDateTimeString_(data.createdAt)}</PostDateTime>
        <ArticleBody>{data.body}</ArticleBody>
        <CreatedBy>
          by <Link href={'/user/profile/' + data.createdBy}>{createdBy}</Link>
        </CreatedBy>
      </main>
    </Layout>
  )
}
export default Show

const PostDateTime = styled.div`
  font-size: 11px;
  text-align: right;
`

const ArticleBody = styled.div`
  white-space: pre-line;
  margin: 16px 0;
  padding: 16px 0;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
`

const CreatedBy = styled.div`
  font-size: 11px;
  text-align: right;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${
    dt.getMonth() + 1
  }月${dt.getDate()}日 ${dt.getHours()}:${dt.getMinutes()}`
}

const getUserNameById_ = async (id: number) => {
  const response = await fetch('/api/profile?id=' + id)
  const json = await response.json()
  return json.name
}
