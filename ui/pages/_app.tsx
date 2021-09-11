import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import React from 'react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
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

  button {
    background-color: #ffffff;
    border-radius: 4px;
    padding: 4px 8px;
    margin: 8px;
    cursor: pointer;

    &:hover {
      background-color: #298aea;
      color: white;
    }
  }
`
