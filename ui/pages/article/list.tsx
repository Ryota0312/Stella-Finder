import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { ArticleList } from '../../components/article/ArticleList'

const List: React.FC = () => {
  const router = useRouter()
  const { tag } = router.query

  return (
    <Layout>
      <main>
        <h2>News</h2>
        <ArticleList tagId={Number(tag)} />
      </main>
    </Layout>
  )
}
export default List
