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
  const [place, setPlace] = useState<string>('')
  const [coverImageKey, setCoverImageKey] = useState<string>('')

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
        <p>所在地</p>
        <input
          type={'text'}
          placeholder={'spot place'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlace(e.target.value)
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
            const response = await register_(name, place, coverImageKey)
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

const register_ = async (name: string, place: string, coverImage: string) => {
  return await fetch('/api/user/spot/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      place: place,
      coverImage: coverImage,
    }),
  })
}
