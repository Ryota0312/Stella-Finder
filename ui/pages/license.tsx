import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import styled from 'styled-components'
import Head from 'next/head'
import { router } from 'next/client'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { InputField } from '../components/common/InputField'
import { useStateWithValidate } from '../hooks/useStateWithValidate'
import { TextField } from '../components/common/TextField'
import { useApi } from '../hooks/useApi'

const License: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>ライセンス | Stella Finder</title>
      </Head>
      <main>
        <h2>ライセンス</h2>
        <LicensesTxtIframe title="ライセンス一覧" src="/licenses.txt" />
      </main>
    </Layout>
  )
}
export default License

const LicensesTxtIframe = styled.iframe`
  width: 100%;
  height: 60vh;
`
