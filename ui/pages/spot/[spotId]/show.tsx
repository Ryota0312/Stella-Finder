import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../../../components/layout'
import { useFragment } from '../../../hooks/useFragment'
import { TwitterCard } from '../../../components/common/TwitterCard'

const SpotShowPageInternal = dynamic(
  () => import('../../../components/spot/SpotShowPageInternal'),
  { ssr: false },
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://stella-finder.com//api/spots?id=${
      context.params ? context.params.spotId : 0
    }`,
  )
  const SSRData = await res.json()

  return { props: { SSRData } }
}

const Show: React.FC = ({
  SSRData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { spotId } = router.query
  const { fragment, setFragment } = useFragment()

  const notify = () => toast.success('Success!')
  useEffect(() => {
    if (fragment == 'success') {
      notify()
      setFragment('')
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>スポット詳細 - {SSRData.name} | Stella Finder</title>
        <TwitterCard
          title={`${SSRData.name} - Stella Finder`}
          description={`${SSRData.name}のスポット詳細ページです`}
          image={`https://stella-finder.com/api/file/download?fileKey=${SSRData.coverImage}&size=600`}
        />
      </Head>

      <main>
        <SpotShowPageInternal spotId={Number(spotId)} />
      </main>
    </Layout>
  )
}
export default Show
