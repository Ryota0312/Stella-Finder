import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Head from 'next/head'
import Layout from '../../components/layout'
import { InputField } from '../../components/common/InputField'
import { useStateWithValidate } from '../../hooks/useStateWithValidate'
import { useApi } from '../../hooks/useApi'
import { Loading } from '../../components/common/Loading'
import { ImageUploader } from '../../components/common/ImageUploader'
import { MarkdownEditor } from '../../components/common/MarkdownEditor'
import { SpotCard } from '../../components/spot/SpotCard'

const notifyError = (msg: string) => toast.error(msg)

const Add: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const router = useRouter()

  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [spotId, setSpotId] = useState(0)
  const [title, isTitleValid, setTitle] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 128
  })
  const [body, isBodyValid, setBody] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 10000
  })
  const [coverImage, setCoverImage] = useState('')

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>観測レポート投稿 | Stella Finder</title>
      </Head>

      <main>
        <h2>観測レポート投稿</h2>

        <InputField
          label="スポット(WIP: IDで入力してね)"
          value={String(spotId)}
          onChange={(v) => setSpotId(Number(v))}
        />
        <SpotCard spotId={spotId} />
        <InputField
          label="タイトル"
          value={title}
          onChange={(v) => setTitle(v)}
          isValid={isTitleValid}
          validateErrorMsg="1文字以上128文字以下で入力してください"
        />
        <p>カバー画像</p>
        <ImageUploader onSuccess={(res) => setCoverImage(res.fileKey)} />
        <MarkdownEditor
          value={body}
          onChange={(v) => setBody(v)}
          isValid={isBodyValid}
        />
        <button
          onClick={() => {
            if (!isTitleValid || !isBodyValid) {
              notifyError('入力内容にエラーがあります')
              return
            }
            postFetcher('/api/user/report/add', {
              spotId: spotId,
              title: title,
              body: body,
              coverImage: coverImage,
            }).then(async (res) => {
              if (!res.error) {
                await router.push('/')
              } else {
                notifyError(res.error)
              }
            })
          }}
        >
          投稿
        </button>
      </main>
    </Layout>
  )
}
export default Add
