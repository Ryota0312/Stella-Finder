import React from 'react'
import Layout from '../../components/layout'
import { ArticleList } from '../../components/article/ArticleList'

const List: React.FC = () => {
  return (
    <Layout>
      <main>
        <h2>News</h2>
        <ArticleList />
      </main>
    </Layout>
  )
}
export default List
