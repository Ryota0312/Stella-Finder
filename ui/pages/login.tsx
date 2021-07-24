import Layout from '../components/layout'
import { useAuth } from '../hooks/useAuth'

const Login: React.FC = () => {
  const { setLoginName, setPassword, send, logout } = useAuth()
  return (
    <Layout>
      <main>
        <h1>Login</h1>
        <div>
          <p>ログイン名</p>
          <input
            type={'text'}
            placeholder={'your name'}
            onChange={(e: any) => setLoginName(e.target.value)}
          />
          <p>パスワード</p>
          <input
            type={'password'}
            placeholder={'password'}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <button type={'button'} onClick={send}>
            Enter
          </button>
          <button type={'button'} onClick={logout}>
            Logout
          </button>
        </div>
      </main>
    </Layout>
  )
}
export default Login
