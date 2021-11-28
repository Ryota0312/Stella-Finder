import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/layout'

const Register: React.FC = () => {
  const router = useRouter()
  const { registerKey } = router.query

  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  if (isComplete) {
    return (
      <Layout>
        <main>
          <div>登録が完了しました！以下からログインしてください。</div>
          <Link href={'login'}>ログイン</Link>
        </main>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <main>
          <h2>ユーザー登録</h2>

          {error && <div>エラーがあります</div>}

          <div>
            <p>ユーザー名</p>
            <input
              type={'text'}
              placeholder={'your e-mail address'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
            />
            <p>パスワード</p>
            <input
              type={'password'}
              placeholder={'password'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <p>確認パスワード</p>
            <input
              type={'password'}
              placeholder={'confirm password'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            {password !== confirmPassword && confirmPassword.length > 0 && (
              <div>パスワードが一致しません</div>
            )}
            <RegisterButton
              type={'button'}
              onClick={() => {
                register_(
                  registerKey as string,
                  userName,
                  password,
                  confirmPassword,
                ).then(
                  (res) => {
                    if (res.ok) {
                      setIsComplete(true)
                    } else {
                      setError(true)
                    }
                  },
                  () => {
                    setError(true)
                  },
                )
              }}
            >
              登録
            </RegisterButton>
          </div>
        </main>
      </Layout>
    )
  }
}
export default Register

const RegisterButton = styled.button`
  display: block;
  width: 31%;
  margin-top: 32px;
`

const register_ = async (
  registerKey: string,
  userName: string,
  password: string,
  confirmPassword: string,
) => {
  if (password === confirmPassword) {
    return await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registerKey: registerKey,
        userName: userName,
        password: password,
      }),
    })
  } else {
    console.log('Password not match')
    return Promise.reject()
  }
}
