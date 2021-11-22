import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import { useApi } from '../../../hooks/useApi'
import Layout from '../../../components/layout'
import { ImageUploader } from '../../../components/common/ImageUploader'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'
import { LoginUserOnly } from '../../../components/common/LoginUserOnly'

import 'react-toastify/dist/ReactToastify.css'
import { useFragment } from '../../../hooks/useFragment'

const Spot: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query
  const { fragment, setFragment } = useFragment()

  const [coverImage, setCoverImage] = useState<string>('')

  const fetcher = useApi()
  const { data, error } = useSWR(
    ['/api/spots' + '?id=' + spotId, false],
    fetcher,
  )

  useEffect(() => {
    if (data) {
      setCoverImage(data.coverImage)
    }
  }, [data])

  const notify = () => toast.success('Success!')
  useEffect(() => {
    if (fragment == 'success') {
      notify()
      setFragment('')
    }
  }, [])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット詳細 - {data.name}</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <main>
        <h2>{data.name}</h2>
        <div>所在地: {data.place}</div>
        <UnoptimizedImage fileKey={coverImage} height={'200px'} />

        <LoginUserOnly>
          <ImageUploader
            onSuccess={(res) => {
              setCoverImage(res.fileKey)
              fetch('/api/user/spot/update', {
                method: 'POST',
                body: JSON.stringify({
                  spotId: Number(spotId),
                  coverImage: res.fileKey,
                }),
              })
            }}
          />
        </LoginUserOnly>
      </main>
    </Layout>
  )
}
export default Spot
