import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const { setMailAddress, setPassword, login } = useAuth()
  return (
    <Layout>
      <main>
        <h2>ログイン</h2>
        <Link href="/tmpRegister">新規ユーザー登録</Link>
        <LoginForm>
          <p>メールアドレス</p>
          <input
            type={'text'}
            placeholder={'your e-mail address'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMailAddress(e.target.value)
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
          <button
            type={'button'}
            onClick={() => {
              login().then((res) => {
                if (res.ok) {
                  window.location.href = '/'
                } else {
                  console.log('Login failed')
                }
              })
            }}
          >
            ログイン
          </button>
        </LoginForm>
      </main>
    </Layout>
  )
}
export default Login

const LoginForm = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: 80vw;
  max-width: 400px;
  margin: 16px 0;

  input {
    width: 70%;
  }

  button {
    display: block;
    margin-top: 32px;
    width: 72%;
    line-height: 2em;
    font-size: 1em;
  }
`
