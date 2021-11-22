import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useApi } from '../../hooks/useApi'

export const UserSettingsForm: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const [loginUserId, setLoginUserId] = useState(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    fetcher('/api/loginUser', false).then((res) => {
      setLoginUserId(res.id)
      setUserName(res.name)
    })
  }, [])

  const { data, error } = useSWR(
    ['/api/user/profile' + '?id=' + loginUserId, false],
    fetcher,
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <input
        type={'text'}
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
      />
      <button
        onClick={() =>
          postFetcher('/api/user/profile', {
            id: loginUserId,
            userName: userName,
          }).then(() => (window.location.href = '/user/profile/' + loginUserId))
        }
      >
        Save
      </button>
    </div>
  )
}
