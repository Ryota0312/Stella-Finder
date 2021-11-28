import Head from 'next/head'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'
import { GridList, GridListItemData } from '../../components/common/GridList'
import { LoginUserOnly } from '../../components/common/LoginUserOnly'
import { PrefectureButton } from '../../components/common/PrefectureButton'

type SpotListItem = {
  id: number
  name: string
  coverImage: string
}

const List: React.FC = () => {
  const router = useRouter()
  const { pref } = router.query

  const fetcher = useApi()
  const { data, error } = useSWR(
    !pref ? ['/api/spot/list', false] : ['/api/spot/list?pref=' + pref, false],
    fetcher,
  )

  const [prefectures, setPrefectures] = useState<Array<string>>(() => {
    if (!pref) {
      return []
    } else {
      return String(pref).split(' ')
    }
  })

  useEffect(() => {
    setPrefectures(() => {
      if (!pref) {
        return []
      } else {
        return String(pref).split(' ')
      }
    })
  }, [pref])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット一覧</title>
      </Head>

      <main>
        <h2>スポット一覧</h2>
        <div>
          <PrefectureButtonList>
            {prefectures.map((p) => {
              return (
                <PrefectureButton
                  key={p}
                  prefecture={p}
                  onDelete={() =>
                    router.push(
                      '/spot/list?pref=' +
                        prefectures
                          .filter((prefecture) => prefecture !== p)
                          .join('+'),
                    )
                  }
                />
              )
            })}
          </PrefectureButtonList>
        </div>
        <LoginUserOnly>
          <Link href={'/spot/register'}>スポット登録</Link>
        </LoginUserOnly>
        {data.length === 0 && <div>スポットが登録されていません</div>}
        {data.length > 0 && (
          <GridList data={convertToGridItem(data)} link="spot/detail" />
        )}
      </main>
    </Layout>
  )
}
export default List

const PrefectureButtonList = styled.div`
  display: flex;
`

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return {
      id: spot.id,
      title: spot.name,
      coverImage: spot.coverImage,
    } as GridListItemData
  })
}
