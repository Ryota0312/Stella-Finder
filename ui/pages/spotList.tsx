import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const SpotList: React.FC<{ data: { name: string } }> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>Spot List</title>
      </Head>

      <main>
        <h2>Spot List</h2>
        <div>{data.name}</div>
      </main>
    </Layout>
  )
}
export default SpotList

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://host.docker.internal/api/spots?id=1')
  const data = (await res.json())[0] as { name: string }
  return {
    props: {
      data,
    },
  }
}
