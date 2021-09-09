import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

const Register: React.FC = () => {
  const router = useRouter()
  const { registerKey } = router.query

  const [loginName, setLoginName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  return (
    <Layout>
      <main>
        <h1>Register</h1>

        <div>{}</div>

        <div>
          <p>ログイン名</p>
          <input
            type={'text'}
            placeholder={'login name'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLoginName(e.target.value)
            }
          />
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
            <div>まちがってるよ</div>
          )}
          <button
            type={'button'}
            onClick={() =>
              register_(
                registerKey as string,
                loginName,
                userName,
                password,
                confirmPassword,
              )
            }
          >
            Register
          </button>
        </div>
      </main>
    </Layout>
  )
}
export default Register

const register_ = async (
  registerKey: string,
  loginName: string,
  userName: string,
  password: string,
  confirmPassword: string,
) => {
  if (password === confirmPassword) {
    await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registerKey: registerKey,
        loginName: loginName,
        userName: userName,
        password: password,
      }),
    })
  } else {
    console.log('Password not match')
  }
}
