import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import styled from 'styled-components'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'
import { useFragment } from '../../../hooks/useFragment'
import { LoginUserOnly } from '../../../components/common/LoginUserOnly'
import { ImageUploader } from '../../../components/common/ImageUploader'

import 'react-toastify/dist/ReactToastify.css'

const Spot: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query
  const { fragment, setFragment } = useFragment()

  const [coverImage, setCoverImage] = useState<string>('')
  const [updatedBy, setUpdatedBy] = useState<string>('')

  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/spots' + '?id=' + spotId, false],
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
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット詳細 - {data.name}</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />

      <main>
        <h2>{data.name}</h2>
        <UnoptimizedImage fileKey={coverImage} height={'400px'} />
        <SpotInfoTable>
          <tbody>
            <tr>
              <th>名称</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>
                〒{data.postalCode}
                <br />
                {data.prefecture + data.address}
              </td>
            </tr>
            <tr>
              <th>地図</th>
              <td>
                <iframe
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
              <td>{data.remarks}</td>
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

        <LoginUserOnly>
          <ImageUploader
            onSuccess={(res) => {
              setCoverImage(res.fileKey)
              fetch('/api/user/spot/update', {
                method: 'POST',
                body: JSON.stringify({
                  spotId: Number(spotId),
                  coverImage: res.fileKey,
                }),
              })
            }}
          />
        </LoginUserOnly>
      </main>
    </Layout>
  )
}
export default Spot

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
  }

  td {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 8px;
  }
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
