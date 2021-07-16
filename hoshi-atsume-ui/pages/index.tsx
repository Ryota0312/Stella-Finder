import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components';
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hoshi Atsume</title>
      </Head>

      <main>
          <Title>index page</Title>
          <div>
              <Link href={'/spotList'}>
                  <a>Watching Spot List</a>
              </Link>
          </div>
      </main>
    </Layout>
  )
}

const Title = styled.h1`
  background-color: yellow;
`;
