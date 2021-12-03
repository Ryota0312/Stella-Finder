import React from 'react'

type InputFieldProps = {
  label?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  validateFunc?: () => boolean
  validateErrorMsg?: string
}

export const InputField: React.FC<InputFieldProps> = (
  props: InputFieldProps,
) => {
  return (
    <>
      {!!props.label && <p>{props.label}</p>}
      <input
        type={'text'}
        value={props.value ? props.value : ''}
        onChange={(e) => props.onChange(e)}
      />
    </>
  )
}
