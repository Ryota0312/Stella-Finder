import React, { useEffect, useState } from 'react'
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
import { InputSpotIdWithSearchByName } from '../../components/common/InputSpotIdWithSearchByName'

const notifyError = (msg: string) => toast.error(msg)

const Add: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const router = useRouter()
  const { spotId } = router.query

  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [linkedSpotId, setLinkedSpotId] = useState(0)
  const [title, isTitleValid, setTitle] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 128
  })
  const [body, isBodyValid, setBody] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 10000
  })
  const [coverImage, setCoverImage] = useState('')

  useEffect(() => setLinkedSpotId(Number(spotId)), [spotId])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>観測レポート投稿 | Stella Finder</title>
      </Head>

      <main>
        <h2>観測レポート投稿</h2>

        <InputSpotIdWithSearchByName
          initialSpotId={linkedSpotId}
          onSet={(v) => setLinkedSpotId(v)}
        />
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
              spotId: linkedSpotId,
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
