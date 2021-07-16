import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Globalstyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

const Globalstyle = createGlobalStyle`
  a {
    color: #0070f3;
    text-decoration: none;
  }
`
