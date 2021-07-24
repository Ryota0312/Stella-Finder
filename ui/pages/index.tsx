import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/layout'

const Home: React.FC = () => (
  <Layout>
    <Head>
      <title>Hoshi Atsume</title>
    </Head>

    <main>
      <Title>index page</Title>
      <div>
        <Link href={'/spotList'}>
          <a>Watching Spot List</a>
        </Link>
      </div>
      <button
        type={'button'}
        onClick={() => {
          fetch('/api/user/getUser', { method: 'GET' }).then((res) => {
            if (!res.ok) {
              console.log('unauthorized')
              window.location.href = '/login'
            }
          })
        }}
      >
        Run Get User API
      </button>
    </main>
  </Layout>
)
export default Home

const Title = styled.h1`
  background-color: yellow;
`
