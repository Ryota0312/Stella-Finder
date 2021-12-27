import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../../components/layout'
import { InputField } from '../../../components/common/InputField'
import { useStateWithValidate } from '../../../hooks/useStateWithValidate'
import { TextField } from '../../../components/common/TextField'
import { useApi } from '../../../hooks/useApi'
import { Loading } from '../../../components/common/Loading'

const notifyError = (msg: string) => toast.error(msg)

const Edit: React.FC = () => {
  const router = useRouter()
  const { articleId } = router.query

  const { fetcher, postFetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [title, isTitleValid, setTitle] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 128
  })
  const [body, isBodyValid, setBody] = useStateWithValidate('', (v) => {
    return v.length > 0 && v.length <= 10000
  })

  useEffect(() => {
    fetcher('/api/articles?articleId=' + articleId, false).then((res) => {
      setTitle(res.title)
      setBody(res.body)
    })
  }, [articleId])

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <main>
        <h2>記事を修正</h2>

        <InputField
          label="タイトル"
          value={title}
          onChange={(v) => setTitle(v)}
          isValid={isTitleValid}
          validateErrorMsg="1文字以上128文字以下で入力してください"
        />
        <TextField
          label="本文"
          value={body}
          onChange={(v) => setBody(v)}
          isValid={isBodyValid}
          validateErrorMsg="1文字以上10000文字以下で入力してください"
        />
        <button
          onClick={() => {
            if (!isTitleValid || !isBodyValid) {
              notifyError('入力内容にエラーがあります')
              return
            }
            postFetcher('/api/user/article/update', {
              id: Number(articleId),
              title: title,
              body: body,
            }).then(async (res) => {
              if (!res.error) {
                await router.push('/')
              } else {
                notifyError(res.error)
              }
            })
          }}
        >
          修正
        </button>
      </main>
    </Layout>
  )
}
export default Edit
