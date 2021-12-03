import Head from 'next/head'
import React, { useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Layout from '../../components/layout'
import { ImageUploader } from '../../components/common/ImageUploader'
import { useApi } from '../../hooks/useApi'

import 'react-toastify/dist/ReactToastify.css'
import { PrefectureSelect } from '../../components/common/PrefectureSelect'
import { InputField } from '../../components/common/InputField'

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

      <main>
        <h2>スポット登録</h2>
        スポット登録ページです。
        <InputField
          label="スポット名"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <InputField
          label="郵便番号"
          value={postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostalCode(e.target.value)
          }
        />
        <p>都道府県</p>
        <PrefectureSelect onChange={(e) => setPrefecture(e.target.value)} />
        <InputField
          label="住所"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        />
        <InputField
          label="その他"
          value={remarks}
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
            if (prefecture === '') {
              notifyError('都道府県は必須です')
              return
            }
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
