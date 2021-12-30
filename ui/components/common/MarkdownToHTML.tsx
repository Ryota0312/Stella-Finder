import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import styled from 'styled-components'

export type MarkdownToHTMLProps = {
  children: string
}

export const MarkdownToHTML: React.FC<MarkdownToHTMLProps> = (
  props: MarkdownToHTMLProps,
) => {
  return (
    <MarkdownStyle>
      <ReactMarkdown plugins={[gfm]} linkTarget={'_blank'}>
        {props.children}
      </ReactMarkdown>
    </MarkdownStyle>
  )
}

const MarkdownStyle = styled.div`
  h1 {
    font-size: xx-large;
    color: #3e4f6d;
    margin: 0;
  }

  h2 {
    font-size: x-large;
    color: #3e4f6d;
    margin: 0;
  }

  h3 {
    font-size: large;
    color: #3e4f6d;
    margin: 0;
  }

  h4 {
    font-size: medium;
    color: #3e4f6d;
    margin: 0;
  }

  h5 {
    font-size: small;
    color: #3e4f6d;
    margin: 0;
  }

  h6 {
    font-size: x-small;
    color: #3e4f6d;
    margin: 0;
  }

  ul,
  ol,
  li {
    line-height: 1em;
  }

  p {
    margin: 0;
  }

  img {
    max-width: 70%;
  }

  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    margin: 8px 0;
    border-spacing: 0;
    width: 100%;

    th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 8px;
      background-color: #eee;
    }

    td {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 8px;
    }
  }
`
