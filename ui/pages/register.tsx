import React, { useState } from 'react'
import Layout from '../components/layout'

const Register: React.FC = () => {
  const [mail, setMail] = useState<string>('')

  return (
    <Layout>
      <main>
        <h1>Register</h1>

        <div>
          <p>メールアドレス</p>
          <input
            type={'text'}
            placeholder={'your e-mail address'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMail(e.target.value)
            }
          />
          <button type={'button'} onClick={() => register_(mail)}>
            Register
          </button>
        </div>
      </main>
    </Layout>
  )
}
export default Register

const register_ = async (mail: string) => {
  await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: mail }),
  })
}
