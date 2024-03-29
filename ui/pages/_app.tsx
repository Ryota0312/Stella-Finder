import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Loading } from '../components/common/Loading'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded ? (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  ) : (
    <Loading />
  )
}
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
    border-color: #ccc;
    border-radius: 4px;
    padding: 4px 8px;
    margin: 8px 0;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #aaa;
      //color: white;
    }
  }

  input {
    border: 2px solid gray;
    border-radius: 4px;
    line-height: 2em;
    width: 30%;

    @media screen and (max-width: 600px) {
      width: 85vw;
    }
  }

  textarea {
    border: 2px solid gray;
    border-radius: 4px;
    line-height: 1.5em;
    width: 80%;

    @media screen and (max-width: 600px) {
      width: 85vw;
    }
  }

  select {
    border: 2px solid gray;
    border-radius: 4px;
    height: 2em;
    line-height: 2em;
    width: 31%;
    background-color: transparent;
    font-size: 1em;

    @media screen and (max-width: 600px) {
      width: 87vw;
    }
  }
`
