import React from 'react'
import styled from 'styled-components'
import { InsertImage } from '../article/InsertImage'
import { TextField } from './TextField'
import { MarkdownToHTML } from './MarkdownToHTML'
import { FoldComponent } from './FoldComponent'

type MarkdownEditorProps = {
  value: string
  onChange: (v: string) => void
  isValid: boolean
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (
  props: MarkdownEditorProps,
) => {
  return (
    <div>
      <p>本文</p>
      <FoldComponent
        labelOpen="プレビューを開く"
        labelClose="プレビューを閉じる"
      >
        <Preview>
          <MarkdownToHTML>{props.value}</MarkdownToHTML>
        </Preview>
      </FoldComponent>
      <TextField
        value={props.value}
        onChange={(v) => props.onChange(v)}
        isValid={props.isValid}
        validateErrorMsg="1文字以上10000文字以下で入力してください"
        rows={20}
      />
      <InsertImage
        onInsert={(mdImageText) =>
          props.onChange(props.value + '\n' + mdImageText)
        }
      />
    </div>
  )
}

const Preview = styled.div`
  white-space: pre-line;
`
