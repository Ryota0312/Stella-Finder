import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { InputField } from '../../components/common/InputField'
import { useStateWithValidate } from '../../hooks/useStateWithValidate'
import { TextField } from '../../components/common/TextField'
import { useApi } from '../../hooks/useApi'
import { Loading } from '../../components/common/Loading'
import { ImageUploader } from '../../components/common/ImageUploader'
import { InsertImage } from '../../components/article/InsertImage'

const notifyError = (msg: string) => toast.error(msg)

const Add: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const router = useRouter()

  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [title, isTitleValid, setTitle] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 128
  })
  const [body, isBodyValid, setBody] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 10000
  })
  const [coverImage, setCoverImage] = useState('')
  const [tag, isTagValid, setTag] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length < 64
  })

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <main>
        <h2>記事作成</h2>

        <InputField
          label="タイトル"
          value={title}
          onChange={(v) => setTitle(v)}
          isValid={isTitleValid}
          validateErrorMsg="1文字以上128文字以下で入力してください"
        />
        <p>カバー画像</p>
        <ImageUploader onSuccess={(res) => setCoverImage(res.fileKey)} />
        <TextField
          label="本文"
          value={body}
          onChange={(v) => setBody(v)}
          isValid={isBodyValid}
          validateErrorMsg="1文字以上10000文字以下で入力してください"
          rows={20}
        />
        <InsertImage
          onInsert={(mdImageText) => setBody(body + '\n' + mdImageText)}
        />
        <InputField
          label="タグ"
          value={tag}
          onChange={(v) => setTag(v)}
          isValid={isTagValid}
          validateErrorMsg="1文字以上64文字未満で入力してください"
        />
        <button
          onClick={() => {
            if (!isTitleValid || !isBodyValid) {
              notifyError('入力内容にエラーがあります')
              return
            }
            postFetcher('/api/user/article/add', {
              title: title,
              body: body,
              coverImage: coverImage,
              tags: [tag],
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
