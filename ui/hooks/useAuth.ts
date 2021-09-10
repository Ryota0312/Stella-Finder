import { useState } from 'react'

export const useAuth = () => {
  const [mailAddress, setMailAddress] = useState<string>('')
  const [password, setPassword] = useState('')

  const login = async () => {
    await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mailAddress: mailAddress, password: password }),
    })
    window.location.href = '/'
  }

  const logout = async () => {
    await fetch('/auth/logout', {
      method: 'GET',
    })
    window.location.reload()
  }

  return {
    setMailAddress: setMailAddress,
    setPassword,
    login,
    logout,
  }
}
