import { useState } from 'react'

export const useAuth = () => {
  const [loginName, setLoginName] = useState<string>('')
  const [password, setPassword] = useState('')

  async function send() {
    await fetch('http://localhost/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginName: loginName, password: password }),
    })
  }

  return {
    setLoginName,
    setPassword,
    send,
  }
}
