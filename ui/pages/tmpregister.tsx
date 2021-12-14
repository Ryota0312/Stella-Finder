import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../components/layout'
import { InputField } from '../components/common/InputField'
import { useStateWithValidate } from '../hooks/useStateWithValidate'

const TmpRegister: React.FC = () => {
  const [mail, isMailValid, setMail] = useStateWithValidate('', (v) => {
    const mailAddressRegExp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$',
    )
    return mailAddressRegExp.test(v)
  })

  const [isComplete, setIsComplete] = useState<boolean>(false)

  const notifyError = (msg: string) => toast.error(msg)

  if (isComplete) {
    return (
      <Layout>
        <main>
          <MailSendSuccess>
            <Image
              src="/image/mail-send-success.png"
              alt="Success mail sent"
              width={64}
              height={64}
            />
            <div>
              入力いただいたメールアドレスに本登録用メールを送信しました。メールに記載されたURLより本登録へお進みください。
            </div>
          </MailSendSuccess>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <main>
          <h2>新規ユーザー登録</h2>

          <div>
            <InputField
              label="メールアドレス"
              value={mail}
              required={true}
              onChange={(v) => setMail(v)}
              isValid={isMailValid}
              validateErrorMsg="メールアドレスが空または不正な形式です"
            />
            <button
              type={'button'}
              onClick={() => {
                if (!isMailValid) {
                  notifyError('入力内容にエラーがあります')
                  return
                }
                return register_(mail).then(async (res) => {
                  if (res.ok) {
                    setIsComplete(true)
                  } else {
                    const json = await res.json()
                    notifyError(json.error)
                  }
                })
              }}
            >
              登録
            </button>
          </div>
        </main>
      </Layout>
    )
  }
}
export default TmpRegister

const MailSendSuccess = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 48px;
`

const register_ = async (mail: string) => {
  return await fetch('/auth/tmpregister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: mail }),
  })
}