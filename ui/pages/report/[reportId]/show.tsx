import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { Loading } from '../../../components/common/Loading'
import { LinkedUserName } from '../../../components/common/LinkedUserName'
import { AdminUserOnly } from '../../../components/common/AdminUserOnly'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'
import { MarkdownToHTML } from '../../../components/common/MarkdownToHTML'
import { SpotCard } from '../../../components/spot/SpotCard'
import { SpecifiedUserOnly } from '../../../components/common/SpecifiedUserOnly'

const Show: React.FC = () => {
  const router = useRouter()
  const { reportId } = router.query

  const { fetcher, postFetcher } = useApi()
  const { data, error } = useSWR(
    reportId ? ['/api/report?reportId=' + reportId, false] : null,
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>観測レポート - {data.title} | Stella Finder</title>
      </Head>

      <main>
        <h2>{data.title}</h2>
        <PostDateTime>{convertDateTimeString_(data.createdAt)}</PostDateTime>
        <ArticleBody>
          {data.coverImage && (
            <CoverImage>
              <UnoptimizedImage
                fileKey={data.coverImage}
                width={'80vw'}
                height={'80vw'}
                maxWidth={'600px'}
                maxHeight={'300px'}
                objectFit={'contain'}
              />
            </CoverImage>
          )}
          <SpotCard
            spotId={data.spotId}
            onClick={() => router.push('/spot/' + data.spotId + '/show')}
          />
          <MarkdownToHTML>{data.body}</MarkdownToHTML>
        </ArticleBody>
        <CreatedBy>
          by <LinkedUserName userId={data.createdBy} />
        </CreatedBy>
        <SpecifiedUserOnly userId={data.createdBy}>
          <button onClick={() => router.push('/report/' + reportId + '/edit')}>
            編集
          </button>
          <DeleteButton
            onClick={() =>
              postFetcher('/api/user/report/delete', {
                id: Number(reportId),
              }).then(() => router.push('/report/list'))
            }
          >
            削除
          </DeleteButton>
        </SpecifiedUserOnly>
      </main>
    </Layout>
  )
}
export default Show

const CoverImage = styled.div`
  margin-bottom: 16px;
  div {
    margin: auto;
  }
`

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
