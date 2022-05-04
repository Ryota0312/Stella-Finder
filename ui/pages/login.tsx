import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'
import { useApi } from '../hooks/useApi'

const notifyError = (msg: string) => toast.error(msg)

const Login: React.FC = () => {
  const { setMailAddress, setPassword, login } = useAuth()
  const router = useRouter()
  const { redirect } = router.query
  const { fetcher } = useApi()

  return (
    <Layout>
      <Head>
        <title>ログイン | Stella Finder</title>
      </Head>

      <main>
        <h2>ログイン</h2>
        <Link href="/tmpregister">新規ユーザー登録</Link>
        <LoginContainer>
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
                    if (redirect) {
                      window.location.href = String(redirect)
                    } else {
                      window.location.href = '/'
                    }
                  } else {
                    const json = await res.json()
                    notifyError(json.error)
                  }
                })
              }}
            >
              ログイン
            </button>
            <Link href="/prepareChangePassword">
              パスワードをお忘れの方はこちら
            </Link>
          </LoginForm>
          <SNSLogin>
            <TwitterLoginButton
              onClick={() =>
                fetcher('/auth/twitter/getOAuthInfo', false).then((res) => {
                  const twitterOAuthURL =
                    `https://twitter.com/i/oauth2/authorize?response_type=code&redirect_uri=${encodeURI(
                      res.redirectUri,
                    )}` +
                    `&scope=${res.scope}&client_id=${res.clientId}&state=${res.state}` +
                    `&code_challenge=${res.codeChallenge}&code_challenge_method=${res.codeChallengeMethod}`
                  window.location.href = twitterOAuthURL
                })
              }
            >
              <Image
                src="/image/twitter-logo.png"
                alt="Twitter"
                width={24}
                height={19.5}
              />
              <div>Twitterアカウントでログイン</div>
            </TwitterLoginButton>
          </SNSLogin>
        </LoginContainer>
      </main>
    </Layout>
  )
}
export default Login

const LoginContainer = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0;
  }
`

const LoginForm = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  width: 40vw;
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

  @media screen and (max-width: 600px) {
    width: 80vw;
  }
`

const SNSLogin = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  width: 40vw;

  @media screen and (max-width: 600px) {
    width: 80vw;
  }
`

const TwitterLoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 8px 16px;
  text-align: left;
  background-color: #00acee;
  color: white;
  font-size: 16px;
`
