import React, { useState } from 'react'
import Layout from '../components/layout'

const TmpRegister: React.FC = () => {
  const [mail, setMail] = useState<string>('')
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  if (isComplete) {
    return (
      <Layout>
        <main>
          <div>
            仮登録が完了しました。入力したメールアドレスに記載されたURLより本登録へお進みください。
          </div>
        </main>
      </Layout>
    )
  } else {
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
            <button
              type={'button'}
              onClick={() => {
                return register_(mail).then((res) => {
                  if (res.ok) {
                    console.log('success')
                    setIsComplete(true)
                  } else {
                    console.log('error')
                    setError(true)
                  }
                })
              }}
            >
              Register
            </button>
            {error && <div>このメールアドレスはすでに使用されています</div>}
          </div>
        </main>
      </Layout>
    )
  }
}
export default TmpRegister

const register_ = async (mail: string) => {
  return await fetch('/auth/tmpRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: mail }),
  })
}
