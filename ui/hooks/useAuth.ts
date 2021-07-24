import { useState } from 'react'

export const useAuth = () => {
  const [loginName, setLoginName] = useState<string>('')
  const [password, setPassword] = useState('')

  const send = async () => {
    await fetch('http://localhost/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginName: loginName, password: password }),
    })
  }

  const logout = async () => {
    await fetch('http://localhost/api/logout', {
      method: 'GET',
    })
  }

  return {
    setLoginName,
    setPassword,
    send,
    logout,
  }
}
