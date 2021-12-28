import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { number } from 'prop-types'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { Loading } from '../../../components/common/Loading'
import { LinkedUserName } from '../../../components/common/LinkedUserName'
import { AdminUserOnly } from '../../../components/common/AdminUserOnly'
import { AutoLink } from '../../../components/common/AutoLink'

const Show: React.FC = () => {
  const router = useRouter()
  const { articleId } = router.query

  const { fetcher, postFetcher } = useApi()
  const { data, error } = useSWR(
    articleId ? ['/api/articles?articleId=' + articleId, false] : null,
    fetcher,
  )

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
        <ArticleBody>
          <AutoLink>{data.body}</AutoLink>
        </ArticleBody>
        <CreatedBy>
          by <LinkedUserName userId={data.createdBy} />
        </CreatedBy>
        <AdminUserOnly>
          <button
            onClick={() => router.push('/article/' + articleId + '/edit')}
          >
            編集
          </button>
          <DeleteButton
            onClick={() =>
              postFetcher('/api/user/article/delete', {
                id: Number(articleId),
              }).then(() => router.push('/article/list'))
            }
          >
            削除
          </DeleteButton>
        </AdminUserOnly>
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
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  font-size: 11px;
  text-align: right;
`

const DeleteButton = styled.button`
  background-color: red;
  color: white;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日 ${(
    '00' + dt.getHours()
  ).slice(-2)}:${('00' + dt.getMinutes()).slice(-2)}`
}
