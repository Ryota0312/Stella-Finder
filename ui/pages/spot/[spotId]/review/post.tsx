import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../../../../components/layout'
import { useApi } from '../../../../hooks/useApi'

import 'react-toastify/dist/ReactToastify.css'
import { StarEvaluate } from '../../../../components/common/StarEvaluate'
import { ImageUploader } from '../../../../components/common/ImageUploader'

const Post: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query

  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [name, setName] = useState<string>()
  const [image, setImage] = useState<string>('')
  const [darkness, setDarkness] = useState(0)
  const [view, setView] = useState(0)
  const [safety, setSafety] = useState(0)
  const [comment, setComment] = useState('')

  const notifyError = (msg: string) => toast.error(msg)

  useEffect(() => {
    fetcher('/api/spots?id=' + spotId, false).then((res) => {
      setName(res.name)
    })
  }, [spotId])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>{name} - レビュー投稿</title>s
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />

      <main>
        <h2>{name}のレビュー投稿</h2>
        <p>空の暗さ</p>
        <StarEvaluate onChange={(point) => setDarkness(point)} />
        <p>見晴らし</p>
        <StarEvaluate onChange={(point) => setView(point)} />
        <p>安全性</p>
        <StarEvaluate onChange={(point) => setSafety(point)} />
        <p>コメント</p>
        <input
          type={'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
        />
        <p>写真</p>
        <ImageUploader
          onSuccess={(res) => {
            setImage(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            const response = await post_(
              Number(spotId),
              darkness,
              view,
              safety,
              comment,
              [image],
            )
            if (response.ok) {
              await router.push(`/spot/detail/${spotId}#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          投稿
        </button>
      </main>
    </Layout>
  )
}
export default Post

const post_ = async (
  spotId: number,
  darkness: number,
  view: number,
  safety: number,
  comment: string,
  images: Array<string>,
) => {
  return await fetch('/api/user/review/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spotId: spotId,
      darkness: darkness,
      view: view,
      safety: safety,
      comment: comment,
      images: images,
    }),
  })
}
