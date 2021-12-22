import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { ArticleList } from '../../components/article/ArticleList'
import { TagList } from '../../components/article/TagList'

const List: React.FC = () => {
  const router = useRouter()
  const { tag } = router.query

  const [selectedTag, setSelectedTag] = useState(tag ? Number(tag) : 0)

  useEffect(() => setSelectedTag(Number(tag)), [tag])

  return (
    <Layout>
      <main>
        <h2>News</h2>
        <TagList
          selected={selectedTag}
          onChange={(tagId) => router.replace('/article/list?tag=' + tagId)}
        />
        <ArticleList tagId={selectedTag} />
      </main>
    </Layout>
  )
}
export default List
