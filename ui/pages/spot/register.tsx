import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { ImageUploader } from '../../components/common/ImageUploader'

const Register: React.FC = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [place, setPlace] = useState<string>('')
  const [coverImageKey, setCoverImageKey] = useState<string>('')

  if (isComplete) {
    return (
      <Layout>
        <main>
          <div>登録成功</div>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Head>
          <title>Spot List</title>s
        </Head>

        <main>
          <h2>Spot Register</h2>
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
            onClick={() => {
              return register_(name, place, coverImageKey).then((res) => {
                if (res.ok) {
                  setIsComplete(true)
                }
              })
            }}
          >
            Register
          </button>
        </main>
      </Layout>
    )
  }
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