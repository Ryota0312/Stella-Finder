import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Layout from '../../../../components/layout'
import { useApi } from '../../../../hooks/useApi'

import { StarEvaluator } from '../../../../components/common/StarEvaluator'
import { TextField } from '../../../../components/common/TextField'
import { useStateWithValidate } from '../../../../hooks/useStateWithValidate'
import { ImageUploader } from '../../../../components/common/ImageUploader'
import { Loading } from '../../../../components/common/Loading'

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
  const [comment, isCommentValid, setComment] = useStateWithValidate(
    '',
    (v) => v.length <= 1000,
  )

  const notifyError = (msg: string) => toast.error(msg)

  useEffect(() => {
    fetcher('/api/spots?id=' + spotId, false).then((res) => {
      setName(res.name)
    })
  }, [spotId])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>{name} - レビュー投稿</title>s
      </Head>

      <main>
        <h2>{name}のレビュー投稿</h2>
        <StarEvaluator
          label="空の暗さ"
          size={32}
          required={true}
          onChange={(point) => setDarkness(point)}
        />
        <StarEvaluator
          label="見晴らし"
          size={32}
          required={true}
          onChange={(point) => setView(point)}
        />
        <StarEvaluator
          label="安全性"
          size={32}
          required={true}
          onChange={(point) => setSafety(point)}
        />
        <TextField
          label="コメント"
          value={comment}
          onChange={(v) => setComment(v)}
          isValid={isCommentValid}
          validateErrorMsg="1000文字以内で入力してください"
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
            if (!isCommentValid) {
              notifyError('入力内容にエラーがあります')
              return
            }
            if (darkness === 0 || view === 0 || safety == 0) {
              notifyError(
                '空の暗さ、見晴らし、安全性は☆1つ以上の評価を選択してください',
              )
              return
            }
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
