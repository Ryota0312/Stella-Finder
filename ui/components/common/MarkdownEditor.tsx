import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { TextField } from './TextField'

type MarkdownEditorProps = {
  value: string
  onChange: (v: string) => void
  isValid: boolean
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = (
  props: MarkdownEditorProps,
) => {
  return (
    <>
      <TextField
        label="本文"
        value={props.value}
        onChange={(v) => props.onChange(v)}
        isValid={props.isValid}
        validateErrorMsg="1文字以上10000文字以下で入力してください"
        rows={20}
      />
    </>
  )
}
