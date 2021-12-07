import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'

const Show: React.FC = () => {
  const router = useRouter()
  const { articleId } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    articleId ? ['/api/articles?articleId=' + articleId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>

      <main>
        <h2>{data.title}</h2>
        <ArticleBody>{data.body}</ArticleBody>
        <div>written by {data.createdBy}</div>
        <div>{data.createdAt}</div>
      </main>
    </Layout>
  )
}
export default Show

const ArticleBody = styled.div`
  white-space: pre-line;
`
