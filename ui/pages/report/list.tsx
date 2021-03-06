import React from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../../components/common/TinyLoading'
import { ReportListItem } from '../../components/report/ReportListItem'

const List: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query

  const { fetcher } = useApi()
  const { data, error } = useSWR(
    !spotId
      ? ['/api/report/list', false]
      : ['/api/report/listBySpot?spotId=' + spotId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <Layout>
      <Head>
        <title>観測レポート一覧 | Stella Finder</title>
      </Head>

      <main>
        <h2>観測レポート</h2>
        <ReportList>
          {data.length === 0 && (
            <>
              <div>観測レポートはまだ投稿されていません</div>
              <button onClick={() => router.push('/report/add')}>
                <ButtonInnerWithImage>
                  <Image
                    src={'/image/spot-report.png'}
                    alt={'観測レポート投稿'}
                    width={18}
                    height={18}
                  />
                  <div>観測レポート投稿</div>
                </ButtonInnerWithImage>
              </button>
            </>
          )}
          {data.map((d: any) => (
            <li key={d.id}>
              <ReportListItem
                id={d.id}
                title={d.title}
                coverImage={d.coverImage}
                body={d.body}
                createdAt={d.createdAt}
                createdBy={d.createdBy}
              />
            </li>
          ))}
        </ReportList>
      </main>
    </Layout>
  )
}
export default List

const ReportList = styled.ul`
  list-style: none;
  padding: 0;
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 4px;
`
