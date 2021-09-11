import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const { setMailAddress, setPassword, login } = useAuth()
  return (
    <Layout>
      <main>
        <h1>Login</h1>
        <Link href="/tmpRegister">登録はこちら</Link>
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
            Enter
          </button>
        </div>
      </main>
    </Layout>
  )
}
export default Login
