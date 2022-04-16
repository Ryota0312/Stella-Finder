import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import styled from 'styled-components'
import Head from 'next/head'
import { router } from 'next/client'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { InputField } from '../components/common/InputField'
import { useStateWithValidate } from '../hooks/useStateWithValidate'
import { TextField } from '../components/common/TextField'
import { useApi } from '../hooks/useApi'

const Contact: React.FC = () => {
  const router = useRouter()
  const { postFetcher } = useApi()
  const [mail, isMailValid, setMail] = useStateWithValidate('', (v) => {
    const mailAddressRegExp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$',
    )
    return mailAddressRegExp.test(v)
  })
  const [body, isBodyValid, setBody] = useStateWithValidate(
    '',
    (v) => v.length > 0 && v.length <= 1000,
  )

  const notifyError = (msg: string) => toast.error(msg)

  return (
    <Layout>
      <Head>
        <title>お問い合わせ | Stella Finder</title>
      </Head>

      <main>
        <h2>お問い合わせ</h2>
        <InputField
          label="メールアドレス"
          value={mail}
          required={true}
          onChange={(v) => setMail(v)}
          isValid={isMailValid}
          validateErrorMsg="メールアドレスが空または不正な形式です"
        />
        <TextField
          label="本文"
          value={body}
          required={true}
          onChange={(v) => setBody(v)}
          isValid={isBodyValid}
          validateErrorMsg="1000文字以内で入力してください"
        />
        <button
          type={'button'}
          onClick={async () => {
            if (!isMailValid || !isBodyValid) {
              notifyError('入力内容にエラーがあります')
              return
            }
            postFetcher('/api/contact/send', {
              mailAddress: mail,
              body: body,
            }).then(() => router.push('/'))
          }}
        >
          送信
        </button>
      </main>
    </Layout>
  )
}
export default Contact
