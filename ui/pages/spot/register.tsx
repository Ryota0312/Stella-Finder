import Head from 'next/head'
import React, { useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Layout from '../../components/layout'
import { useApi } from '../../hooks/useApi'

import { PrefectureSelect } from '../../components/common/PrefectureSelect'
import { InputField } from '../../components/common/InputField'
import { useStateWithValidate } from '../../hooks/useStateWithValidate'
import { TextField } from '../../components/common/TextField'
import { ImageUploader } from '../../components/common/ImageUploader'
import { Loading } from '../../components/common/Loading'

const Register: React.FC = () => {
  const router = useRouter()

  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [name, isNameValid, setName] = useStateWithValidate('', (v) => v !== '')
  const [coverImageKey, setCoverImageKey] = useState<string>('')
  const [postalCode, isPostalCodeValid, setPostalCode] = useStateWithValidate(
    '',
    (v) => {
      const regExp = new RegExp('^[0-9]{3}-?[0-9]{4}$')
      return v === '' || regExp.test(v)
    },
  )
  const [prefecture, isPrefectureValid, setPrefecture] = useStateWithValidate(
    '',
    (v) => v !== '',
  )
  const [address, setAddress] = useState<string>('')
  const [remarks, isRemarksValid, setRemarks] = useStateWithValidate(
    '',
    (v) => v.length <= 1000,
  )

  const notifyError = (msg: string) => toast.error(msg)

  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>スポット登録</title>s
      </Head>

      <main>
        <h2>スポット登録</h2>
        スポット登録ページです。
        <InputField
          label="スポット名"
          value={name}
          required={true}
          onChange={(v) => setName(v)}
          isValid={isNameValid}
          validateErrorMsg="必須です"
        />
        <InputField
          label="郵便番号"
          value={postalCode}
          onChange={(v) => setPostalCode(v)}
          isValid={isPostalCodeValid}
          validateErrorMsg="郵便番号の形式が不正です"
        />
        <PrefectureSelect
          label="都道府県"
          required={true}
          value={prefecture}
          onChange={(v) => setPrefecture(v)}
          isValid={isPrefectureValid}
          validateErrorMsg="必須です"
        />
        <InputField
          label="住所"
          value={address}
          onChange={(v) => setAddress(v)}
        />
        <TextField
          label="その他"
          value={remarks}
          onChange={(v) => setRemarks(v)}
          isValid={isRemarksValid}
          validateErrorMsg="1000文字以内で入力してください"
        />
        <p>写真</p>
        <ImageUploader
          onSuccess={(res) => {
            setCoverImageKey(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            if (
              !isNameValid ||
              !isPostalCodeValid ||
              !isPrefectureValid ||
              !isRemarksValid
            ) {
              notifyError('入力内容にエラーがあります')
              return
            }
            const response = await register_(
              name,
              coverImageKey,
              postalCode,
              prefecture,
              address,
              remarks,
            )
            if (response.ok) {
              const json = await response.json()
              await router.push(`/spot/detail/${json.id}#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          登録
        </button>
      </main>
    </Layout>
  )
}
export default Register

const register_ = async (
  name: string,
  coverImage: string,
  postalCode: string,
  prefecture: string,
  address: string,
  remarks: string,
) => {
  return await fetch('/api/user/spot/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      coverImage: coverImage,
      postalCode: postalCode,
      prefecture: prefecture,
      address: address,
      remarks: remarks,
    }),
  })
}
