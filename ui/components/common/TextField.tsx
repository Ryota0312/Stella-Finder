import React from 'react'
import styled from 'styled-components'

type InputFieldProps = {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  isValid?: boolean
  validateErrorMsg?: string
}

export const TextField: React.FC<InputFieldProps> = (
  props: InputFieldProps,
) => {
  return (
    <>
      <Label>
        {!!props.label && <p>{props.label}</p>}
        {props.required && <Required>必須</Required>}
      </Label>
      <TextAreaAndError>
        <TextArea
          rows={7}
          value={props.value}
          onChange={(e) => {
            props.onChange(e)
          }}
        />
        {!props.isValid && (
          <ValidateError>{props.validateErrorMsg}</ValidateError>
        )}
      </TextAreaAndError>
    </>
  )
}

TextField.defaultProps = {
  value: '',
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

const TextAreaAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 600px) {
    display: inline-block;
  }
`

const TextArea = styled.textarea`
  width: 80%;
`

const ValidateError = styled.div`
  color: red;
  font-size: 12px;

  @media screen and (max-width: 600px) {
    margin-top: 8px;
  }
`
