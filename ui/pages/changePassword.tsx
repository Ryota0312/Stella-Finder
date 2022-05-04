import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import { useStateWithValidate } from '../hooks/useStateWithValidate'
import { InputField } from '../components/common/InputField'

const ChangePassword: React.FC = () => {
  const router = useRouter()
  const { resetCode } = router.query

  const [isComplete, setIsComplete] = useState<boolean>(false)

  const [password, isPasswordValid, setPassword] = useStateWithValidate(
    '',
    (v) => {
      const regExp = new RegExp('^(?=.*?[a-zA-Z])(?=.*?\\d)[a-zA=Z\\d]{8,100}$')
      return regExp.test(v)
    },
  )
  const [confirmPassword, isConfirmPasswordValid, setConfirmPassword] =
    useStateWithValidate('', (v) => v.length > 0 && v === password)

  const notifyError = (msg: string) => toast.error(msg)

  if (isComplete) {
    return (
      <Layout>
        <Head>
          <title>パスワード変更完了 | Stella Finder</title>
        </Head>

        <main>
          <RegisterSuccess>
            <Image
              src="/image/register-success.png"
              alt="Change success"
              width={64}
              height={64}
            />
            <div>
              <div>
                パスワードの変更が完了しました！以下からログインしてください。
              </div>
              <button onClick={() => router.push('/login')}>ログイン</button>
            </div>
          </RegisterSuccess>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Head>
          <title>パスワード変更 | Stella Finder</title>
        </Head>

        <main>
          <h2>パスワード変更</h2>

          <div>
            <InputField
              label="パスワード"
              value={password}
              type={'password'}
              required={true}
              isValid={isPasswordValid}
              onChange={(v) => setPassword(v)}
              validateErrorMsg="8文字以上で入力してください。半角英字・数字がそれぞれ1文字以上含まれている必要があります。"
            />
            <InputField
              label="確認パスワード"
              value={confirmPassword}
              required={true}
              type={'password'}
              onChange={(v) => setConfirmPassword(v)}
              isValid={isConfirmPasswordValid}
              validateErrorMsg="パスワードが一致していません"
            />
            <RegisterButton
              type={'button'}
              onClick={() => {
                if (!isPasswordValid || !isConfirmPasswordValid) {
                  notifyError('入力内容にエラーがあります')
                  return
                }
                register_(resetCode as string, password, confirmPassword).then(
                  async (res) => {
                    if (res.ok) {
                      setIsComplete(true)
                    } else {
                      const json = await res.json()
                      notifyError(json.error)
                    }
                  },
                  () => {
                    notifyError('Error')
                  },
                )
              }}
            >
              変更
            </RegisterButton>
          </div>
        </main>
      </Layout>
    )
  }
}
export default ChangePassword

const RegisterButton = styled.button`
  display: block;
  width: 31%;
  margin-top: 32px;
`

const RegisterSuccess = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  margin-top: 48px;
`

const register_ = async (
  resetCode: string,
  password: string,
  confirmPassword: string,
) => {
  if (password === confirmPassword) {
    return await fetch('/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetCode: resetCode,
        password: password,
      }),
    })
  } else {
    console.log('Password not match')
    return Promise.reject()
  }
}
