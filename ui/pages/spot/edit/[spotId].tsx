import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../../components/layout'
import { ImageUploader } from '../../../components/common/ImageUploader'
import { useApi } from '../../../hooks/useApi'

import 'react-toastify/dist/ReactToastify.css'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'

const Edit: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query

  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [name, setName] = useState<string>('')
  const [coverImageKey, setCoverImageKey] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [prefecture, setPrefecture] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [remarks, setRemarks] = useState<string>('')

  const notifyError = (msg: string) => toast.error(msg)

  useEffect(() => {
    fetcher('/api/spots?id=' + spotId, false).then((res) => {
      setName(res.name)
      setCoverImageKey(res.coverImage)
      setPostalCode(res.postalCode)
      setPrefecture(res.prefecture)
      setAddress(res.address)
      setRemarks(res.remarks)
    })
  }, [spotId])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット情報編集</title>s
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />

      <main>
        <h2>スポット情報編集</h2>
        <p>スポット名</p>
        <input
          type={'text'}
          placeholder={'spot name'}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <p>郵便番号</p>
        <input
          type={'text'}
          value={postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostalCode(e.target.value)
          }
        />
        <p>都道府県</p>
        <input
          type={'text'}
          value={prefecture}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrefecture(e.target.value)
          }
        />
        <p>住所</p>
        <input
          type={'text'}
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        />
        <p>その他</p>
        <input
          type={'text'}
          value={remarks}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRemarks(e.target.value)
          }
        />
        <p>写真</p>
        <UnoptimizedImage fileKey={coverImageKey} height={'400px'} />
        <ImageUploader
          onSuccess={(res) => {
            setCoverImageKey(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            const response = await update_(
              Number(spotId),
              coverImageKey,
              postalCode,
              prefecture,
              address,
              remarks,
            )
            if (response.ok) {
              await router.push(`/spot/detail/${spotId}#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          更新
        </button>
      </main>
    </Layout>
  )
}
export default Edit

const update_ = async (
  spotId: number,
  coverImage: string,
  postalCode: string,
  prefecture: string,
  address: string,
  remarks: string,
) => {
  return await fetch('/api/user/spot/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spotId: spotId,
      coverImage: coverImage,
      postalCode: postalCode,
      prefecture: prefecture,
      address: address,
      remarks: remarks,
    }),
  })
}
