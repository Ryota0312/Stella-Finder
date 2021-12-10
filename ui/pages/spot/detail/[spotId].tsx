import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'
import { useFragment } from '../../../hooks/useFragment'
import { LoginUserOnly } from '../../../components/common/LoginUserOnly'
import { AddImageDialog } from '../../../components/spot/AddImageDialog'
import { SpotImageList } from '../../../components/spot/SpotImageList'
import { ReviewList } from '../../../components/review/ReviewList'
import { ReviewSummary } from '../../../components/review/ReviewSummary'
import { MoonRiseSet } from '../../../components/moon/MoonRiseSet'
import { MoonAge } from '../../../components/moon/MoonAge'
import { Loading } from '../../../components/common/Loading'
import { CurrentWeather } from '../../../components/weather/CurrentWeather'

const Spot: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query
  const { fragment, setFragment } = useFragment()

  const [isOpenAddImageDialog, setIsOpenAddImageDialog] =
    useState<boolean>(false)
  const [coverImage, setCoverImage] = useState<string>('')
  const [updatedBy, setUpdatedBy] = useState<string>('')

  const fetcher = useApi()
  const { data, error } = useSWR(
    spotId ? ['/api/spots' + '?id=' + spotId, false] : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      setCoverImage(data.coverImage)
      getUserNameById_(data.updatedBy).then((name) => setUpdatedBy(name))
    }
  }, [data])

  const notify = () => toast.success('Success!')
  useEffect(() => {
    if (fragment == 'success') {
      notify()
      setFragment('')
    }
  }, [])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>スポット詳細 - {data.name}</title>
      </Head>

      <main>
        <h2>{data.name}</h2>
        <CoverImageAndReviewSummary>
          <div>
            <UnoptimizedImage
              fileKey={coverImage}
              width={'90vw'}
              height={'90vw'}
              maxWidth={'600px'}
              maxHeight={'600px'}
              objectFit={'cover'}
            />
          </div>
          <MoonAndReview>
            <CurrentWeather spotId={data.id} />
            <MoonInfo>
              <MoonAge />
              <MoonRiseSet prefecture={data.prefecture} />
            </MoonInfo>
            <ReviewSummary
              total={data.avgTotalPoint}
              darkness={data.avgDarknessPoint}
              view={data.avgViewPoint}
              safety={data.avgSafetyPoint}
            />
          </MoonAndReview>
        </CoverImageAndReviewSummary>
        <SpotInfoTable>
          <tbody>
            <tr>
              <th>名称</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>
                〒{data.postalCode.slice(0, 3) + '-' + data.postalCode.slice(3)}
                <br />
                {data.prefecture + data.address}
              </td>
            </tr>
            <tr>
              <th>地図</th>
              <td>
                <Map
                  title="map"
                  width="600"
                  height="450"
                  loading="lazy"
                  allowFullScreen
                  src={
                    'https://www.google.com/maps/embed/v1/place?key=' +
                    process.env.NEXT_PUBLIC_MAPS_API_KEY +
                    '&q=' +
                    data.name +
                    '+' +
                    data.prefecture +
                    data.address
                  }
                />
              </td>
            </tr>
            <tr>
              <th>その他</th>
              <Remarks>{data.remarks}</Remarks>
            </tr>
            <tr>
              <th>最終更新</th>
              <td>
                {convertDateTimeString_(data.updatedAt)} (
                <Link href={'/user/profile/' + data.updatedBy}>
                  {updatedBy}
                </Link>
                )
              </td>
            </tr>
          </tbody>
        </SpotInfoTable>
        <LoginUserOnly
          fallbackComponent={
            <Link href={'/login?redirect=' + location.pathname}>
              ログインしてレビューを投稿する
            </Link>
          }
        >
          <Actions>
            <button onClick={() => router.push('/spot/edit/' + spotId)}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/spot-edit.png'}
                  alt={'Edit spot information'}
                  width={18}
                  height={18}
                />
                <div>スポット情報を編集</div>
              </ButtonInnerWithImage>
            </button>
            <button onClick={() => setIsOpenAddImageDialog(true)}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/spot-photo.png'}
                  alt={'Edit spot information'}
                  width={18}
                  height={18}
                />
                <div>写真を投稿</div>
              </ButtonInnerWithImage>
            </button>
            <button
              onClick={() => router.push('/spot/' + spotId + '/review/post')}
            >
              <ButtonInnerWithImage>
                <Image
                  src={'/image/spot-review.png'}
                  alt={'Edit spot information'}
                  width={18}
                  height={18}
                />
                <div>レビュー投稿</div>
              </ButtonInnerWithImage>
            </button>
          </Actions>
          <AddImageDialog
            isOpen={isOpenAddImageDialog}
            closeDialog={() => setIsOpenAddImageDialog(false)}
            spotId={Number(spotId)}
          />
        </LoginUserOnly>
        <SpotImageList spotId={Number(spotId)} />
        <ReviewList spotId={Number(spotId)} />
      </main>
    </Layout>
  )
}
export default Spot

const MoonAndReview = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (max-width: 950px) {
    gap: 8px;
    margin-top: 16px;
  }
`

const MoonInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  @media screen and (max-width: 950px) {
    justify-content: flex-start;
    gap: 8px;
    margin-top: 8px;
  }
`

const CoverImageAndReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media screen and (max-width: 950px) {
    display: block;
  }
`

const SpotInfoTable = styled.table`
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin: 8px 0;
  border-spacing: 0;
  width: 100%;

  th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    background-color: #eee;
  }

  td {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 8px;
  }

  @media screen and (max-width: 600px) {
    th {
      display: block;
    }

    td {
      display: block;
    }
  }
`

const Map = styled.iframe`
  width: 100%;
  max-width: 600px;
  border: none;
`

const Actions = styled.div`
  button {
    margin: 4px 8px 4px 0;
  }
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 4px;
`

const Remarks = styled.td`
  white-space: pre-line;
`

const convertDateTimeString_ = (datetime: string) => {
  const dt = new Date(datetime)
  return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`
}

const getUserNameById_ = async (id: number) => {
  const response = await fetch('/api/profile?id=' + id)
  const json = await response.json()
  return json.name
}
