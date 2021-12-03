import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export const UserSettingsForm: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const [loginUserId, setLoginUserId] = useState(null)
  const [userName, setUserName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetcher('/api/loginUser', false).then((res) => {
      setLoginUserId(res.id)
      setUserName(res.name)
    })
  }, [])

  const { data, error } = useSWR(
    loginUserId ? ['/api/profile' + '?id=' + loginUserId, false] : null,
    fetcher,
  )

  useEffect(() => {
    if (data) setDescription(data.description)
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h2>プロフィールを編集</h2>
      <p>ユーザー名</p>
      <input
        type={'text'}
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
      />
      <p>自己紹介</p>
      <DescriptionInput
        rows={7}
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
      />
      <div></div>
      <button
        onClick={() =>
          postFetcher('/api/user/profile', {
            userName: userName,
            description: description,
          }).then(() => (window.location.href = '/user/profile/' + loginUserId))
        }
      >
        Save
      </button>
    </div>
  )
}

const DescriptionInput = styled.textarea`
  width: 80%;
`
