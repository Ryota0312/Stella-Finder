import { useState } from 'react'

export const useAuth = () => {
  const [loginName, setLoginName] = useState<string>('')
  const [password, setPassword] = useState('')

  const login = async () => {
    await fetch('http://localhost/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginName: loginName, password: password }),
    })
    window.location.href = '/'
  }

  const logout = async () => {
    await fetch('http://localhost/auth/logout', {
      method: 'GET',
    })
    window.location.reload()
  }

  return {
    setLoginName,
    setPassword,
    login,
    logout,
  }
}
