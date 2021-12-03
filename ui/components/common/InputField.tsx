import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type InputFieldProps = {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  validateFunc?: (value: string) => boolean
  validateErrorMsg?: string
}

export const InputField: React.FC<InputFieldProps> = (
  props: InputFieldProps,
) => {
  const [accept, setAccept] = useState(false)

  useEffect(() => {
    if (!props.validateFunc) {
      setAccept(true)
    } else {
      setAccept(props.validateFunc(props.value))
    }
  }, [props.value])

  return (
    <>
      <Label>
        {!!props.label && <p>{props.label}</p>}
        {props.required && <Required>必須</Required>}
      </Label>
      <InputAndError>
        <input
          type={'text'}
          value={props.value}
          onChange={(e) => {
            props.onChange(e)
            if (props.validateFunc) {
              setAccept(props.validateFunc(props.value))
            }
          }}
        />
        {!!props.validateFunc && !accept && (
          <ValidateError>{props.validateErrorMsg}</ValidateError>
        )}
      </InputAndError>
    </>
  )
}

InputField.defaultProps = {
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

const InputAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 600px) {
    display: inline-block;
  }
`

const ValidateError = styled.div`
  color: red;
  font-size: 12px;

  @media screen and (max-width: 600px) {
    margin-top: 8px;
  }
`
