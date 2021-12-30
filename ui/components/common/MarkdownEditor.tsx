import React from 'react'
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
      <TextField
        label="本文"
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
      <FoldComponent
        labelOpen="プレビューを開く"
        labelClose="プレビューを閉じる"
      >
        <MarkdownToHTML>{props.value}</MarkdownToHTML>
      </FoldComponent>
    </div>
  )
}