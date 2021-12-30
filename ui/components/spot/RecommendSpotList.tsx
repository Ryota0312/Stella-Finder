import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { LoginUserOnly } from '../common/LoginUserOnly'
import { RoundFrame } from '../common/RoundFrame'
import { GridList, GridListItemData } from './GridList'

type RecommendSpotListProps = {
  showAllPrefecture: boolean
}

export const RecommendSpotList: React.FC<RecommendSpotListProps> = (props) => {
  const router = useRouter()
  const [prefecture, setPrefecture] = useState<string | null>(null)
  const [data, setData] = useState<Array<any>>([])

  useEffect(() => {
    if (props.showAllPrefecture) {
      setPrefecture(null)
    } else {
      const localStoragePref = localStorage.getItem('prefecture')
      if (localStoragePref) {
        setPrefecture(localStoragePref)
      } else {
        setPrefecture('東京都')
      }
    }
  }, [])

  const { fetcher } = useApi()
  useEffect(() => {
    if (!props.showAllPrefecture && !prefecture) return
    const prefQuery = prefecture ? `&pref=${prefecture}` : ''
    fetcher(
      '/api/spot/list?order=avg_total_point+desc&limit=3' + prefQuery,
      false,
    ).then((res) => {
      setData([...res])
    })
  }, [prefecture])

  if (!data) return <TinyLoading />

  return (
    <RoundFrame title={`${prefecture ? prefecture : '全国'}のおすすめスポット`}>
      {data.length === 0 && (
        <div>
          <div>
            {prefecture ? prefecture + 'の' : ''}
            スポットはまだ登録されていません
          </div>
          <LoginUserOnly
            fallbackComponent={
              <Link href="/tmpregister">
                ユーザー登録してスポットを登録する
              </Link>
            }
          >
            <button onClick={() => router.push('/spot/register')}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/add.png'}
                  alt={'Add new spot'}
                  width={20}
                  height={20}
                />
                <div>スポットを登録する</div>
              </ButtonInnerWithImage>
            </button>
          </LoginUserOnly>
        </div>
      )}
      {data.length > 0 && <GridList data={convertToGridItem(data)} />}
      <ShowMore>
        {!prefecture ? (
          <Link href="/spot/list?order=avg_total_point+desc">
            全国のスポットをもっと見る
          </Link>
        ) : (
          <Link
            href={'/spot/list?order=avg_total_point+desc&pref=' + prefecture}
          >
            {prefecture + 'のスポットをもっと見る'}
          </Link>
        )}
      </ShowMore>
    </RoundFrame>
  )
}
export default RecommendSpotList

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 8px;
  color: gray;
`

const ShowMore = styled.div`
  text-align: right;
`

type SpotListItem = {
  id: number
  name: string
  coverImage: string
  avgTotalPoint: number
  reviewCount: number
}

const convertToGridItem = (spotList: SpotListItem[]): GridListItemData[] => {
  return spotList.map((spot: SpotListItem) => {
    return {
      id: spot.id,
      title: spot.name,
      coverImage: spot.coverImage,
      avgTotalPoint: spot.avgTotalPoint,
      reviewCount: spot.reviewCount,
    } as GridListItemData
  })
}
