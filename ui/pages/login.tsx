import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'

const notifyError = (msg: string) => toast.error(msg)

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMailAddress(e.target.value)
            }
          />
          <p>パスワード</p>
          <input
            type={'password'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button
            type={'button'}
            onClick={() => {
              login().then(async (res) => {
                if (res.ok) {
                  window.location.href = '/'
                } else {
                  const json = await res.json()
                  notifyError(json.error)
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
