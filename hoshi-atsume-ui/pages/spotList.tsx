import { GetStaticProps } from 'next'
import Layout from '../components/layout'

const SpotList: React.FC<{ data: { message: string } }> = ({ data }) => {
  return (
    <Layout>
      <main>
        <h1>Spot List</h1>
        <div>{data.message}</div>
      </main>
    </Layout>
  )
}
export default SpotList

export const getStaticProps: GetStaticProps = async () => {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('http://host.docker.internal/api/')
  const data = (await res.json()) as { message: string }
  return {
    props: {
      data,
    },
  }
}
