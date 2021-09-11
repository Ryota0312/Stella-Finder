import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const { setMailAddress, setPassword, login } = useAuth()
  return (
    <Layout>
      <main>
        <h2>ログイン</h2>
        <Link href="/tmpRegister">新規ユーザー登録</Link>
        <div>
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
        </div>
      </main>
    </Layout>
  )
}
export default Login
