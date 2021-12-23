import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { InputField } from '../../components/common/InputField'
import { useStateWithValidate } from '../../hooks/useStateWithValidate'
import { TextField } from '../../components/common/TextField'
import { useApi } from '../../hooks/useApi'
import { Loading } from '../../components/common/Loading'
import { ArticleListWidget } from '../../components/article/ArticleListWidget'
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
