import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { useApi } from '../hooks/useApi'

const LoginWithTwitter: React.FC = () => {
  const router = useRouter()
  const { state, code } = router.query

  const { postFetcher } = useApi()

  useEffect(() => {
    if (state && code) {
      postFetcher('/auth/loginWithTwitter', {
        state: state,
        code: code,
      }).then(() => {
        console.log('twitter login ok!')
      })
    }
  }, [state])

  return (
    <Layout>
      <main>
        <div>お待ちください</div>
      </main>
    </Layout>
  )
}
export default LoginWithTwitter
