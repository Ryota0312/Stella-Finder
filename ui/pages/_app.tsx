import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
)
export default MyApp

const GlobalStyle = createGlobalStyle`
  a {
    color: #0070f3;
    text-decoration: none;
  }
`
