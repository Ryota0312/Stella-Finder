import React from 'react'
import styled from 'styled-components'

type InputFieldProps = {
  label?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  validateFunc?: () => boolean
  validateErrorMsg?: string
}

export const InputField: React.FC<InputFieldProps> = (
  props: InputFieldProps,
) => {
  return (
    <>
      <Label>
        {!!props.label && <p>{props.label}</p>}
        {props.required && <Required>必須</Required>}
      </Label>
      <input
        type={'text'}
        value={props.value ? props.value : ''}
        onChange={(e) => props.onChange(e)}
      />
    </>
  )
}

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Required = styled.div`
  background-color: #de2121;
  font-size: 8px;
  color: white;
  border-radius: 4px;
  padding: 2px 4px;
`
