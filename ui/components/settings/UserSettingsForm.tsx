import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useApi } from '../../hooks/useApi'
import { InputField } from '../common/InputField'
import { useStateWithValidate } from '../../hooks/useStateWithValidate'
import { TextField } from '../common/TextField'
import { TinyLoading } from '../common/TinyLoading'

const notifyError = (msg: string) => toast.error(msg)

export const UserSettingsForm: React.FC = () => {
  const { fetcher, postFetcher } = useApi()
  const [loginUserId, setLoginUserId] = useState(null)
  const [userName, isUserNameValid, setUserName] = useStateWithValidate(
    '',
    (v) => v.length > 0 && v.length <= 24,
  )
  const [description, isDescriptionValid, setDescription] =
    useStateWithValidate('', (v) => v.length <= 1000)

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
  if (!data) return <TinyLoading />

  return (
    <div>
      <h2>プロフィールを編集</h2>
      <InputField
        label="ユーザー名"
        value={userName}
        onChange={(v) => setUserName(v)}
        isValid={isUserNameValid}
        validateErrorMsg="1文字以上24文字以内で入力してください"
      />
      <TextField
        label="自己紹介"
        value={description}
        onChange={(v) => setDescription(v)}
        isValid={isDescriptionValid}
        validateErrorMsg="1000文字以内で入力してください"
      />
      <div></div>
      <button
        onClick={() => {
          if (!isUserNameValid || !isDescriptionValid) {
            notifyError('入力内容にエラーがあります')
            return
          }
          postFetcher('/api/user/profile', {
            userName: userName,
            description: description,
          }).then(() => (window.location.href = '/user/profile/' + loginUserId))
        }}
      >
        保存
      </button>
    </div>
  )
}
