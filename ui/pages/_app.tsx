import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import React from 'react'
import { GeistProvider } from '@geist-ui/react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <GeistProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </GeistProvider>
  </>
)
export default MyApp

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  a {
    color: #0070f3;
    text-decoration: none;
  }
`
