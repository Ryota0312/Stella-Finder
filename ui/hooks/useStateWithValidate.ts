import { useEffect, useState } from 'react'

export const useStateWithValidate: (
  initialValue: string,
  validateFunc: (v: string) => boolean,
) => [
  string,
  boolean,
  (value: ((prevState: string) => string) | string) => void,
] = (initialValue: string, validateFunc: (v: string) => boolean) => {
  const [value, setValue] = useState<string>(initialValue)
  const [isValid, setIsValid] = useState<boolean>(validateFunc(value))

  useEffect(() => {
    setIsValid(validateFunc(value))
  }, [value])

  return [value, isValid, setValue]
}
