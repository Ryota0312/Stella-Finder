import Head from 'next/head'
import React, { useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../components/layout'
import { ImageUploader } from '../../components/common/ImageUploader'
import { useApi } from '../../hooks/useApi'

import 'react-toastify/dist/ReactToastify.css'

const Register: React.FC = () => {
  const router = useRouter()

  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [name, setName] = useState<string>('')
  const [coverImageKey, setCoverImageKey] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [prefecture, setPrefecture] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [remarks, setRemarks] = useState<string>('')

  const notifyError = (msg: string) => toast.error(msg)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット登録</title>s
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />

      <main>
        <h2>スポット登録</h2>
        スポット登録ページです。
        <p>スポット名</p>
        <input
          type={'text'}
          placeholder={'spot name'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <p>郵便番号</p>
        <input
          type={'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostalCode(e.target.value)
          }
        />
        <p>都道府県</p>
        <input
          type={'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrefecture(e.target.value)
          }
        />
        <p>住所</p>
        <input
          type={'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        />
        <p>その他</p>
        <input
          type={'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRemarks(e.target.value)
          }
        />
        <p>写真</p>
        <ImageUploader
          onSuccess={(res) => {
            setCoverImageKey(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            const response = await register_(
              name,
              coverImageKey,
              postalCode,
              prefecture,
              address,
              remarks,
            )
            if (response.ok) {
              const json = await response.json()
              await router.push(`/spot/detail/${json.id}#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          登録
        </button>
      </main>
    </Layout>
  )
}
export default Register

const register_ = async (
  name: string,
  coverImage: string,
  postalCode: string,
  prefecture: string,
  address: string,
  remarks: string,
) => {
  return await fetch('/api/user/spot/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      coverImage: coverImage,
      postalCode: postalCode,
      prefecture: prefecture,
      address: address,
      remarks: remarks,
    }),
  })
}
