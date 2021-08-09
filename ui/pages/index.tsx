import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '../components/layout'
import { useApi } from '../hooks/useApi'

const Home: React.FC = () => {
  const { fetcher } = useApi()

  const { data, error } = useSWR(['/api/user/getUser', true], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
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
        <div>{data.name}</div>
      </main>
    </Layout>
  )
}
export default Home

const Title = styled.h1`
  background-color: yellow;
`
