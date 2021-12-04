import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Layout from '../components/layout'

const TmpRegister: React.FC = () => {
  const [mail, setMail] = useState<string>('')
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const notifyError = (msg: string) => toast.error(msg)

  if (isComplete) {
    return (
      <Layout>
        <main>
          <div>
            入力したメールアドレスに本登録用メールを送信しました。メールに記載されたURLより本登録へお進みください。
          </div>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <main>
          <h2>新規ユーザー登録</h2>

          <div>
            <p>メールアドレス</p>
            <MailAddressInput
              type={'text'}
              placeholder={'your e-mail address'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMail(e.target.value)
              }
            />
            <button
              type={'button'}
              onClick={() => {
                if (!validate_(mail)) {
                  notifyError('メールアドレスの形式が不正です')
                  return
                }
                return register_(mail).then((res) => {
                  if (res.ok) {
                    setIsComplete(true)
                  } else {
                    setError(true)
                  }
                })
              }}
            >
              登録
            </button>
            {error && <div>このメールアドレスはすでに使用されています</div>}
          </div>
        </main>
      </Layout>
    )
  }
}
export default TmpRegister

const MailAddressInput = styled.input`
  margin: 0 16px 16px 0;
`

const validate_ = (mail: string) => {
  const mailAddressRegExp = new RegExp(
    '^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$',
  )
  return mailAddressRegExp.test(mail)
}

const register_ = async (mail: string) => {
  return await fetch('/auth/tmpRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: mail }),
  })
}
