import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { GlobalHeader } from './header/GlobalHeader'

import 'react-toastify/dist/ReactToastify.css'
import { Footer } from './footer/Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Generated by create next app" />
        <meta
          name="google-site-verification"
          content="1-qyJk04eKYSQbWtBKrnUmNhr7O6vODhXHLDI7F0PdQ"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5411660226661775"
          crossOrigin="anonymous"
        />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <Main>
        <GlobalHeader />
        <MainContents>{children}</MainContents>
        <Footer />
      </Main>
    </>
  )
}
export default Layout

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const MainContents = styled.div`
  flex: 1;
  margin: 16px auto;
  width: 90vw;
  max-width: 900px;

  h2 {
    color: #3e4f6d;
    font-size: 2em;
  }

  h3 {
    color: #3e4f6d;
    font-size: 1.5em;
  }
`
